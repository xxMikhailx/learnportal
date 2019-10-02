package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.LearnportalApp;
import com.litelife.learnportal.domain.QuizQuestion;
import com.litelife.learnportal.repository.QuizQuestionRepository;
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
 * Integration tests for the {@link QuizQuestionResource} REST controller.
 */
@SpringBootTest(classes = LearnportalApp.class)
public class QuizQuestionResourceIT {

    private static final String DEFAULT_TEXT = "AAAAAAAAAA";
    private static final String UPDATED_TEXT = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private QuizQuestionRepository quizQuestionRepository;

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

    private MockMvc restQuizQuestionMockMvc;

    private QuizQuestion quizQuestion;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QuizQuestionResource quizQuestionResource = new QuizQuestionResource(quizQuestionRepository);
        this.restQuizQuestionMockMvc = MockMvcBuilders.standaloneSetup(quizQuestionResource)
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
    public static QuizQuestion createEntity(EntityManager em) {
        QuizQuestion quizQuestion = new QuizQuestion()
            .text(DEFAULT_TEXT)
            .description(DEFAULT_DESCRIPTION);
        return quizQuestion;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QuizQuestion createUpdatedEntity(EntityManager em) {
        QuizQuestion quizQuestion = new QuizQuestion()
            .text(UPDATED_TEXT)
            .description(UPDATED_DESCRIPTION);
        return quizQuestion;
    }

    @BeforeEach
    public void initTest() {
        quizQuestion = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuizQuestion() throws Exception {
        int databaseSizeBeforeCreate = quizQuestionRepository.findAll().size();

        // Create the QuizQuestion
        restQuizQuestionMockMvc.perform(post("/api/quiz-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizQuestion)))
            .andExpect(status().isCreated());

        // Validate the QuizQuestion in the database
        List<QuizQuestion> quizQuestionList = quizQuestionRepository.findAll();
        assertThat(quizQuestionList).hasSize(databaseSizeBeforeCreate + 1);
        QuizQuestion testQuizQuestion = quizQuestionList.get(quizQuestionList.size() - 1);
        assertThat(testQuizQuestion.getText()).isEqualTo(DEFAULT_TEXT);
        assertThat(testQuizQuestion.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createQuizQuestionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = quizQuestionRepository.findAll().size();

        // Create the QuizQuestion with an existing ID
        quizQuestion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuizQuestionMockMvc.perform(post("/api/quiz-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the QuizQuestion in the database
        List<QuizQuestion> quizQuestionList = quizQuestionRepository.findAll();
        assertThat(quizQuestionList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTextIsRequired() throws Exception {
        int databaseSizeBeforeTest = quizQuestionRepository.findAll().size();
        // set the field null
        quizQuestion.setText(null);

        // Create the QuizQuestion, which fails.

        restQuizQuestionMockMvc.perform(post("/api/quiz-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizQuestion)))
            .andExpect(status().isBadRequest());

        List<QuizQuestion> quizQuestionList = quizQuestionRepository.findAll();
        assertThat(quizQuestionList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQuizQuestions() throws Exception {
        // Initialize the database
        quizQuestionRepository.saveAndFlush(quizQuestion);

        // Get all the quizQuestionList
        restQuizQuestionMockMvc.perform(get("/api/quiz-questions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(quizQuestion.getId().intValue())))
            .andExpect(jsonPath("$.[*].text").value(hasItem(DEFAULT_TEXT.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getQuizQuestion() throws Exception {
        // Initialize the database
        quizQuestionRepository.saveAndFlush(quizQuestion);

        // Get the quizQuestion
        restQuizQuestionMockMvc.perform(get("/api/quiz-questions/{id}", quizQuestion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(quizQuestion.getId().intValue()))
            .andExpect(jsonPath("$.text").value(DEFAULT_TEXT.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQuizQuestion() throws Exception {
        // Get the quizQuestion
        restQuizQuestionMockMvc.perform(get("/api/quiz-questions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuizQuestion() throws Exception {
        // Initialize the database
        quizQuestionRepository.saveAndFlush(quizQuestion);

        int databaseSizeBeforeUpdate = quizQuestionRepository.findAll().size();

        // Update the quizQuestion
        QuizQuestion updatedQuizQuestion = quizQuestionRepository.findById(quizQuestion.getId()).get();
        // Disconnect from session so that the updates on updatedQuizQuestion are not directly saved in db
        em.detach(updatedQuizQuestion);
        updatedQuizQuestion
            .text(UPDATED_TEXT)
            .description(UPDATED_DESCRIPTION);

        restQuizQuestionMockMvc.perform(put("/api/quiz-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuizQuestion)))
            .andExpect(status().isOk());

        // Validate the QuizQuestion in the database
        List<QuizQuestion> quizQuestionList = quizQuestionRepository.findAll();
        assertThat(quizQuestionList).hasSize(databaseSizeBeforeUpdate);
        QuizQuestion testQuizQuestion = quizQuestionList.get(quizQuestionList.size() - 1);
        assertThat(testQuizQuestion.getText()).isEqualTo(UPDATED_TEXT);
        assertThat(testQuizQuestion.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingQuizQuestion() throws Exception {
        int databaseSizeBeforeUpdate = quizQuestionRepository.findAll().size();

        // Create the QuizQuestion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQuizQuestionMockMvc.perform(put("/api/quiz-questions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(quizQuestion)))
            .andExpect(status().isBadRequest());

        // Validate the QuizQuestion in the database
        List<QuizQuestion> quizQuestionList = quizQuestionRepository.findAll();
        assertThat(quizQuestionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQuizQuestion() throws Exception {
        // Initialize the database
        quizQuestionRepository.saveAndFlush(quizQuestion);

        int databaseSizeBeforeDelete = quizQuestionRepository.findAll().size();

        // Delete the quizQuestion
        restQuizQuestionMockMvc.perform(delete("/api/quiz-questions/{id}", quizQuestion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QuizQuestion> quizQuestionList = quizQuestionRepository.findAll();
        assertThat(quizQuestionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QuizQuestion.class);
        QuizQuestion quizQuestion1 = new QuizQuestion();
        quizQuestion1.setId(1L);
        QuizQuestion quizQuestion2 = new QuizQuestion();
        quizQuestion2.setId(quizQuestion1.getId());
        assertThat(quizQuestion1).isEqualTo(quizQuestion2);
        quizQuestion2.setId(2L);
        assertThat(quizQuestion1).isNotEqualTo(quizQuestion2);
        quizQuestion1.setId(null);
        assertThat(quizQuestion1).isNotEqualTo(quizQuestion2);
    }
}
