package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.LearnportalApp;
import com.litelife.learnportal.domain.Theory;
import com.litelife.learnportal.domain.Category;
import com.litelife.learnportal.repository.TheoryRepository;
import com.litelife.learnportal.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.litelife.learnportal.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TheoryResource} REST controller.
 */
@SpringBootTest(classes = LearnportalApp.class)
public class TheoryResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private TheoryRepository theoryRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTheoryMockMvc;

    private Theory theory;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TheoryResource theoryResource = new TheoryResource(theoryRepository);
        this.restTheoryMockMvc = MockMvcBuilders.standaloneSetup(theoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Theory createEntity(EntityManager em) {
        Theory theory = new Theory()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .content(DEFAULT_CONTENT);
        // Add required entity
        Category category;
        if (TestUtil.findAll(em, Category.class).isEmpty()) {
            category = CategoryResourceIT.createEntity(em);
            em.persist(category);
            em.flush();
        } else {
            category = TestUtil.findAll(em, Category.class).get(0);
        }
        theory.setCategory(category);
        return theory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Theory createUpdatedEntity(EntityManager em) {
        Theory theory = new Theory()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .content(UPDATED_CONTENT);
        // Add required entity
        Category category;
        if (TestUtil.findAll(em, Category.class).isEmpty()) {
            category = CategoryResourceIT.createUpdatedEntity(em);
            em.persist(category);
            em.flush();
        } else {
            category = TestUtil.findAll(em, Category.class).get(0);
        }
        theory.setCategory(category);
        return theory;
    }

    @BeforeEach
    public void initTest() {
        theory = createEntity(em);
    }

    @Test
    @Transactional
    public void createTheory() throws Exception {
        int databaseSizeBeforeCreate = theoryRepository.findAll().size();

        // Create the Theory
        restTheoryMockMvc.perform(post("/api/theories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theory)))
            .andExpect(status().isCreated());

        // Validate the Theory in the database
        List<Theory> theoryList = theoryRepository.findAll();
        assertThat(theoryList).hasSize(databaseSizeBeforeCreate + 1);
        Theory testTheory = theoryList.get(theoryList.size() - 1);
        assertThat(testTheory.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTheory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTheory.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createTheoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = theoryRepository.findAll().size();

        // Create the Theory with an existing ID
        theory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTheoryMockMvc.perform(post("/api/theories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theory)))
            .andExpect(status().isBadRequest());

        // Validate the Theory in the database
        List<Theory> theoryList = theoryRepository.findAll();
        assertThat(theoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = theoryRepository.findAll().size();
        // set the field null
        theory.setTitle(null);

        // Create the Theory, which fails.

        restTheoryMockMvc.perform(post("/api/theories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theory)))
            .andExpect(status().isBadRequest());

        List<Theory> theoryList = theoryRepository.findAll();
        assertThat(theoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTheories() throws Exception {
        // Initialize the database
        theoryRepository.saveAndFlush(theory);

        // Get all the theoryList
        restTheoryMockMvc.perform(get("/api/theories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(theory.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getTheory() throws Exception {
        // Initialize the database
        theoryRepository.saveAndFlush(theory);

        // Get the theory
        restTheoryMockMvc.perform(get("/api/theories/{id}", theory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(theory.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTheory() throws Exception {
        // Get the theory
        restTheoryMockMvc.perform(get("/api/theories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTheory() throws Exception {
        // Initialize the database
        theoryRepository.saveAndFlush(theory);

        int databaseSizeBeforeUpdate = theoryRepository.findAll().size();

        // Update the theory
        Theory updatedTheory = theoryRepository.findById(theory.getId()).get();
        // Disconnect from session so that the updates on updatedTheory are not directly saved in db
        em.detach(updatedTheory);
        updatedTheory
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .content(UPDATED_CONTENT);

        restTheoryMockMvc.perform(put("/api/theories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTheory)))
            .andExpect(status().isOk());

        // Validate the Theory in the database
        List<Theory> theoryList = theoryRepository.findAll();
        assertThat(theoryList).hasSize(databaseSizeBeforeUpdate);
        Theory testTheory = theoryList.get(theoryList.size() - 1);
        assertThat(testTheory.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTheory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTheory.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingTheory() throws Exception {
        int databaseSizeBeforeUpdate = theoryRepository.findAll().size();

        // Create the Theory

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTheoryMockMvc.perform(put("/api/theories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(theory)))
            .andExpect(status().isBadRequest());

        // Validate the Theory in the database
        List<Theory> theoryList = theoryRepository.findAll();
        assertThat(theoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTheory() throws Exception {
        // Initialize the database
        theoryRepository.saveAndFlush(theory);

        int databaseSizeBeforeDelete = theoryRepository.findAll().size();

        // Delete the theory
        restTheoryMockMvc.perform(delete("/api/theories/{id}", theory.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Theory> theoryList = theoryRepository.findAll();
        assertThat(theoryList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Theory.class);
        Theory theory1 = new Theory();
        theory1.setId(1L);
        Theory theory2 = new Theory();
        theory2.setId(theory1.getId());
        assertThat(theory1).isEqualTo(theory2);
        theory2.setId(2L);
        assertThat(theory1).isNotEqualTo(theory2);
        theory1.setId(null);
        assertThat(theory1).isNotEqualTo(theory2);
    }
}
