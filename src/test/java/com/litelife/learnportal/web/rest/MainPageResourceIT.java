package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.LearnportalApp;
import com.litelife.learnportal.domain.MainPage;
import com.litelife.learnportal.repository.MainPageRepository;
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
 * Integration tests for the {@link MainPageResource} REST controller.
 */
@SpringBootTest(classes = LearnportalApp.class)
public class MainPageResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_MOTTO = "AAAAAAAAAA";
    private static final String UPDATED_MOTTO = "BBBBBBBBBB";

    @Autowired
    private MainPageRepository mainPageRepository;

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

    private MockMvc restMainPageMockMvc;

    private MainPage mainPage;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MainPageResource mainPageResource = new MainPageResource(mainPageRepository);
        this.restMainPageMockMvc = MockMvcBuilders.standaloneSetup(mainPageResource)
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
    public static MainPage createEntity(EntityManager em) {
        MainPage mainPage = new MainPage()
            .content(DEFAULT_CONTENT)
            .motto(DEFAULT_MOTTO);
        return mainPage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MainPage createUpdatedEntity(EntityManager em) {
        MainPage mainPage = new MainPage()
            .content(UPDATED_CONTENT)
            .motto(UPDATED_MOTTO);
        return mainPage;
    }

    @BeforeEach
    public void initTest() {
        mainPage = createEntity(em);
    }

    @Test
    @Transactional
    public void createMainPage() throws Exception {
        int databaseSizeBeforeCreate = mainPageRepository.findAll().size();

        // Create the MainPage
        restMainPageMockMvc.perform(post("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainPage)))
            .andExpect(status().isCreated());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeCreate + 1);
        MainPage testMainPage = mainPageList.get(mainPageList.size() - 1);
        assertThat(testMainPage.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testMainPage.getMotto()).isEqualTo(DEFAULT_MOTTO);
    }

    @Test
    @Transactional
    public void createMainPageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mainPageRepository.findAll().size();

        // Create the MainPage with an existing ID
        mainPage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMainPageMockMvc.perform(post("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainPage)))
            .andExpect(status().isBadRequest());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkMottoIsRequired() throws Exception {
        int databaseSizeBeforeTest = mainPageRepository.findAll().size();
        // set the field null
        mainPage.setMotto(null);

        // Create the MainPage, which fails.

        restMainPageMockMvc.perform(post("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainPage)))
            .andExpect(status().isBadRequest());

        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMainPages() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);

        // Get all the mainPageList
        restMainPageMockMvc.perform(get("/api/main-pages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mainPage.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].motto").value(hasItem(DEFAULT_MOTTO.toString())));
    }
    
    @Test
    @Transactional
    public void getMainPage() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);

        // Get the mainPage
        restMainPageMockMvc.perform(get("/api/main-pages/{id}", mainPage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mainPage.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.motto").value(DEFAULT_MOTTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMainPage() throws Exception {
        // Get the mainPage
        restMainPageMockMvc.perform(get("/api/main-pages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMainPage() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);

        int databaseSizeBeforeUpdate = mainPageRepository.findAll().size();

        // Update the mainPage
        MainPage updatedMainPage = mainPageRepository.findById(mainPage.getId()).get();
        // Disconnect from session so that the updates on updatedMainPage are not directly saved in db
        em.detach(updatedMainPage);
        updatedMainPage
            .content(UPDATED_CONTENT)
            .motto(UPDATED_MOTTO);

        restMainPageMockMvc.perform(put("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMainPage)))
            .andExpect(status().isOk());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeUpdate);
        MainPage testMainPage = mainPageList.get(mainPageList.size() - 1);
        assertThat(testMainPage.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testMainPage.getMotto()).isEqualTo(UPDATED_MOTTO);
    }

    @Test
    @Transactional
    public void updateNonExistingMainPage() throws Exception {
        int databaseSizeBeforeUpdate = mainPageRepository.findAll().size();

        // Create the MainPage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMainPageMockMvc.perform(put("/api/main-pages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mainPage)))
            .andExpect(status().isBadRequest());

        // Validate the MainPage in the database
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMainPage() throws Exception {
        // Initialize the database
        mainPageRepository.saveAndFlush(mainPage);

        int databaseSizeBeforeDelete = mainPageRepository.findAll().size();

        // Delete the mainPage
        restMainPageMockMvc.perform(delete("/api/main-pages/{id}", mainPage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<MainPage> mainPageList = mainPageRepository.findAll();
        assertThat(mainPageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MainPage.class);
        MainPage mainPage1 = new MainPage();
        mainPage1.setId(1L);
        MainPage mainPage2 = new MainPage();
        mainPage2.setId(mainPage1.getId());
        assertThat(mainPage1).isEqualTo(mainPage2);
        mainPage2.setId(2L);
        assertThat(mainPage1).isNotEqualTo(mainPage2);
        mainPage1.setId(null);
        assertThat(mainPage1).isNotEqualTo(mainPage2);
    }
}
