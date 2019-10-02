package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.LearnportalApp;

import com.litelife.learnportal.domain.Formula;
import com.litelife.learnportal.repository.FormulaRepository;
import com.litelife.learnportal.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.litelife.learnportal.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the FormulaResource REST controller.
 *
 * @see FormulaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LearnportalApp.class)
public class FormulaResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_EQUATION = "AAAAAAAAAA";
    private static final String UPDATED_EQUATION = "BBBBBBBBBB";

    @Autowired
    private FormulaRepository formulaRepository;

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

    private MockMvc restFormulaMockMvc;

    private Formula formula;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FormulaResource formulaResource = new FormulaResource(formulaRepository);
        this.restFormulaMockMvc = MockMvcBuilders.standaloneSetup(formulaResource)
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
    public static Formula createEntity(EntityManager em) {
        Formula formula = new Formula()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .equation(DEFAULT_EQUATION);
        return formula;
    }

    @Before
    public void initTest() {
        formula = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormula() throws Exception {
        int databaseSizeBeforeCreate = formulaRepository.findAll().size();

        // Create the Formula
        restFormulaMockMvc.perform(post("/api/formulas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formula)))
            .andExpect(status().isCreated());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeCreate + 1);
        Formula testFormula = formulaList.get(formulaList.size() - 1);
        assertThat(testFormula.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testFormula.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFormula.getEquation()).isEqualTo(DEFAULT_EQUATION);
    }

    @Test
    @Transactional
    public void createFormulaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formulaRepository.findAll().size();

        // Create the Formula with an existing ID
        formula.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormulaMockMvc.perform(post("/api/formulas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formula)))
            .andExpect(status().isBadRequest());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = formulaRepository.findAll().size();
        // set the field null
        formula.setTitle(null);

        // Create the Formula, which fails.

        restFormulaMockMvc.perform(post("/api/formulas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formula)))
            .andExpect(status().isBadRequest());

        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEquationIsRequired() throws Exception {
        int databaseSizeBeforeTest = formulaRepository.findAll().size();
        // set the field null
        formula.setEquation(null);

        // Create the Formula, which fails.

        restFormulaMockMvc.perform(post("/api/formulas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formula)))
            .andExpect(status().isBadRequest());

        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFormulas() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        // Get all the formulaList
        restFormulaMockMvc.perform(get("/api/formulas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formula.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].equation").value(hasItem(DEFAULT_EQUATION.toString())));
    }
    
    @Test
    @Transactional
    public void getFormula() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        // Get the formula
        restFormulaMockMvc.perform(get("/api/formulas/{id}", formula.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(formula.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.equation").value(DEFAULT_EQUATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFormula() throws Exception {
        // Get the formula
        restFormulaMockMvc.perform(get("/api/formulas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormula() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        int databaseSizeBeforeUpdate = formulaRepository.findAll().size();

        // Update the formula
        Formula updatedFormula = formulaRepository.findById(formula.getId()).get();
        // Disconnect from session so that the updates on updatedFormula are not directly saved in db
        em.detach(updatedFormula);
        updatedFormula
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .equation(UPDATED_EQUATION);

        restFormulaMockMvc.perform(put("/api/formulas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormula)))
            .andExpect(status().isOk());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeUpdate);
        Formula testFormula = formulaList.get(formulaList.size() - 1);
        assertThat(testFormula.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testFormula.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFormula.getEquation()).isEqualTo(UPDATED_EQUATION);
    }

    @Test
    @Transactional
    public void updateNonExistingFormula() throws Exception {
        int databaseSizeBeforeUpdate = formulaRepository.findAll().size();

        // Create the Formula

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormulaMockMvc.perform(put("/api/formulas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(formula)))
            .andExpect(status().isBadRequest());

        // Validate the Formula in the database
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormula() throws Exception {
        // Initialize the database
        formulaRepository.saveAndFlush(formula);

        int databaseSizeBeforeDelete = formulaRepository.findAll().size();

        // Delete the formula
        restFormulaMockMvc.perform(delete("/api/formulas/{id}", formula.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Formula> formulaList = formulaRepository.findAll();
        assertThat(formulaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Formula.class);
        Formula formula1 = new Formula();
        formula1.setId(1L);
        Formula formula2 = new Formula();
        formula2.setId(formula1.getId());
        assertThat(formula1).isEqualTo(formula2);
        formula2.setId(2L);
        assertThat(formula1).isNotEqualTo(formula2);
        formula1.setId(null);
        assertThat(formula1).isNotEqualTo(formula2);
    }
}
