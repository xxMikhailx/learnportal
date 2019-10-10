package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.LearnportalApp;
import com.litelife.learnportal.domain.TaskGivenData;
import com.litelife.learnportal.domain.Task;
import com.litelife.learnportal.repository.TaskGivenDataRepository;
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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.litelife.learnportal.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link TaskGivenDataResource} REST controller.
 */
@SpringBootTest(classes = LearnportalApp.class)
public class TaskGivenDataResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private TaskGivenDataRepository taskGivenDataRepository;

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

    private MockMvc restTaskGivenDataMockMvc;

    private TaskGivenData taskGivenData;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskGivenDataResource taskGivenDataResource = new TaskGivenDataResource(taskGivenDataRepository);
        this.restTaskGivenDataMockMvc = MockMvcBuilders.standaloneSetup(taskGivenDataResource)
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
    public static TaskGivenData createEntity(EntityManager em) {
        TaskGivenData taskGivenData = new TaskGivenData()
            .content(DEFAULT_CONTENT);
        // Add required entity
        Task task;
        if (TestUtil.findAll(em, Task.class).isEmpty()) {
            task = TaskResourceIT.createEntity(em);
            em.persist(task);
            em.flush();
        } else {
            task = TestUtil.findAll(em, Task.class).get(0);
        }
        taskGivenData.setTask(task);
        return taskGivenData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskGivenData createUpdatedEntity(EntityManager em) {
        TaskGivenData taskGivenData = new TaskGivenData()
            .content(UPDATED_CONTENT);
        // Add required entity
        Task task;
        if (TestUtil.findAll(em, Task.class).isEmpty()) {
            task = TaskResourceIT.createUpdatedEntity(em);
            em.persist(task);
            em.flush();
        } else {
            task = TestUtil.findAll(em, Task.class).get(0);
        }
        taskGivenData.setTask(task);
        return taskGivenData;
    }

    @BeforeEach
    public void initTest() {
        taskGivenData = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaskGivenData() throws Exception {
        int databaseSizeBeforeCreate = taskGivenDataRepository.findAll().size();

        // Create the TaskGivenData
        restTaskGivenDataMockMvc.perform(post("/api/task-given-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskGivenData)))
            .andExpect(status().isCreated());

        // Validate the TaskGivenData in the database
        List<TaskGivenData> taskGivenDataList = taskGivenDataRepository.findAll();
        assertThat(taskGivenDataList).hasSize(databaseSizeBeforeCreate + 1);
        TaskGivenData testTaskGivenData = taskGivenDataList.get(taskGivenDataList.size() - 1);
        assertThat(testTaskGivenData.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createTaskGivenDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskGivenDataRepository.findAll().size();

        // Create the TaskGivenData with an existing ID
        taskGivenData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskGivenDataMockMvc.perform(post("/api/task-given-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskGivenData)))
            .andExpect(status().isBadRequest());

        // Validate the TaskGivenData in the database
        List<TaskGivenData> taskGivenDataList = taskGivenDataRepository.findAll();
        assertThat(taskGivenDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskGivenDataRepository.findAll().size();
        // set the field null
        taskGivenData.setContent(null);

        // Create the TaskGivenData, which fails.

        restTaskGivenDataMockMvc.perform(post("/api/task-given-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskGivenData)))
            .andExpect(status().isBadRequest());

        List<TaskGivenData> taskGivenDataList = taskGivenDataRepository.findAll();
        assertThat(taskGivenDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTaskGivenData() throws Exception {
        // Initialize the database
        taskGivenDataRepository.saveAndFlush(taskGivenData);

        // Get all the taskGivenDataList
        restTaskGivenDataMockMvc.perform(get("/api/task-given-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskGivenData.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getTaskGivenData() throws Exception {
        // Initialize the database
        taskGivenDataRepository.saveAndFlush(taskGivenData);

        // Get the taskGivenData
        restTaskGivenDataMockMvc.perform(get("/api/task-given-data/{id}", taskGivenData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taskGivenData.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTaskGivenData() throws Exception {
        // Get the taskGivenData
        restTaskGivenDataMockMvc.perform(get("/api/task-given-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaskGivenData() throws Exception {
        // Initialize the database
        taskGivenDataRepository.saveAndFlush(taskGivenData);

        int databaseSizeBeforeUpdate = taskGivenDataRepository.findAll().size();

        // Update the taskGivenData
        TaskGivenData updatedTaskGivenData = taskGivenDataRepository.findById(taskGivenData.getId()).get();
        // Disconnect from session so that the updates on updatedTaskGivenData are not directly saved in db
        em.detach(updatedTaskGivenData);
        updatedTaskGivenData
            .content(UPDATED_CONTENT);

        restTaskGivenDataMockMvc.perform(put("/api/task-given-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaskGivenData)))
            .andExpect(status().isOk());

        // Validate the TaskGivenData in the database
        List<TaskGivenData> taskGivenDataList = taskGivenDataRepository.findAll();
        assertThat(taskGivenDataList).hasSize(databaseSizeBeforeUpdate);
        TaskGivenData testTaskGivenData = taskGivenDataList.get(taskGivenDataList.size() - 1);
        assertThat(testTaskGivenData.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingTaskGivenData() throws Exception {
        int databaseSizeBeforeUpdate = taskGivenDataRepository.findAll().size();

        // Create the TaskGivenData

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskGivenDataMockMvc.perform(put("/api/task-given-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskGivenData)))
            .andExpect(status().isBadRequest());

        // Validate the TaskGivenData in the database
        List<TaskGivenData> taskGivenDataList = taskGivenDataRepository.findAll();
        assertThat(taskGivenDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTaskGivenData() throws Exception {
        // Initialize the database
        taskGivenDataRepository.saveAndFlush(taskGivenData);

        int databaseSizeBeforeDelete = taskGivenDataRepository.findAll().size();

        // Delete the taskGivenData
        restTaskGivenDataMockMvc.perform(delete("/api/task-given-data/{id}", taskGivenData.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskGivenData> taskGivenDataList = taskGivenDataRepository.findAll();
        assertThat(taskGivenDataList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskGivenData.class);
        TaskGivenData taskGivenData1 = new TaskGivenData();
        taskGivenData1.setId(1L);
        TaskGivenData taskGivenData2 = new TaskGivenData();
        taskGivenData2.setId(taskGivenData1.getId());
        assertThat(taskGivenData1).isEqualTo(taskGivenData2);
        taskGivenData2.setId(2L);
        assertThat(taskGivenData1).isNotEqualTo(taskGivenData2);
        taskGivenData1.setId(null);
        assertThat(taskGivenData1).isNotEqualTo(taskGivenData2);
    }
}
