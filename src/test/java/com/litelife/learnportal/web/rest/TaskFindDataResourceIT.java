package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.LearnportalApp;
import com.litelife.learnportal.domain.TaskFindData;
import com.litelife.learnportal.domain.Task;
import com.litelife.learnportal.repository.TaskFindDataRepository;
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
 * Integration tests for the {@link TaskFindDataResource} REST controller.
 */
@SpringBootTest(classes = LearnportalApp.class)
public class TaskFindDataResourceIT {

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private TaskFindDataRepository taskFindDataRepository;

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

    private MockMvc restTaskFindDataMockMvc;

    private TaskFindData taskFindData;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TaskFindDataResource taskFindDataResource = new TaskFindDataResource(taskFindDataRepository);
        this.restTaskFindDataMockMvc = MockMvcBuilders.standaloneSetup(taskFindDataResource)
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
    public static TaskFindData createEntity(EntityManager em) {
        TaskFindData taskFindData = new TaskFindData()
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
        taskFindData.setTask(task);
        return taskFindData;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TaskFindData createUpdatedEntity(EntityManager em) {
        TaskFindData taskFindData = new TaskFindData()
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
        taskFindData.setTask(task);
        return taskFindData;
    }

    @BeforeEach
    public void initTest() {
        taskFindData = createEntity(em);
    }

    @Test
    @Transactional
    public void createTaskFindData() throws Exception {
        int databaseSizeBeforeCreate = taskFindDataRepository.findAll().size();

        // Create the TaskFindData
        restTaskFindDataMockMvc.perform(post("/api/task-find-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskFindData)))
            .andExpect(status().isCreated());

        // Validate the TaskFindData in the database
        List<TaskFindData> taskFindDataList = taskFindDataRepository.findAll();
        assertThat(taskFindDataList).hasSize(databaseSizeBeforeCreate + 1);
        TaskFindData testTaskFindData = taskFindDataList.get(taskFindDataList.size() - 1);
        assertThat(testTaskFindData.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createTaskFindDataWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = taskFindDataRepository.findAll().size();

        // Create the TaskFindData with an existing ID
        taskFindData.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTaskFindDataMockMvc.perform(post("/api/task-find-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskFindData)))
            .andExpect(status().isBadRequest());

        // Validate the TaskFindData in the database
        List<TaskFindData> taskFindDataList = taskFindDataRepository.findAll();
        assertThat(taskFindDataList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkContentIsRequired() throws Exception {
        int databaseSizeBeforeTest = taskFindDataRepository.findAll().size();
        // set the field null
        taskFindData.setContent(null);

        // Create the TaskFindData, which fails.

        restTaskFindDataMockMvc.perform(post("/api/task-find-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskFindData)))
            .andExpect(status().isBadRequest());

        List<TaskFindData> taskFindDataList = taskFindDataRepository.findAll();
        assertThat(taskFindDataList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTaskFindData() throws Exception {
        // Initialize the database
        taskFindDataRepository.saveAndFlush(taskFindData);

        // Get all the taskFindDataList
        restTaskFindDataMockMvc.perform(get("/api/task-find-data?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(taskFindData.getId().intValue())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getTaskFindData() throws Exception {
        // Initialize the database
        taskFindDataRepository.saveAndFlush(taskFindData);

        // Get the taskFindData
        restTaskFindDataMockMvc.perform(get("/api/task-find-data/{id}", taskFindData.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(taskFindData.getId().intValue()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTaskFindData() throws Exception {
        // Get the taskFindData
        restTaskFindDataMockMvc.perform(get("/api/task-find-data/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTaskFindData() throws Exception {
        // Initialize the database
        taskFindDataRepository.saveAndFlush(taskFindData);

        int databaseSizeBeforeUpdate = taskFindDataRepository.findAll().size();

        // Update the taskFindData
        TaskFindData updatedTaskFindData = taskFindDataRepository.findById(taskFindData.getId()).get();
        // Disconnect from session so that the updates on updatedTaskFindData are not directly saved in db
        em.detach(updatedTaskFindData);
        updatedTaskFindData
            .content(UPDATED_CONTENT);

        restTaskFindDataMockMvc.perform(put("/api/task-find-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTaskFindData)))
            .andExpect(status().isOk());

        // Validate the TaskFindData in the database
        List<TaskFindData> taskFindDataList = taskFindDataRepository.findAll();
        assertThat(taskFindDataList).hasSize(databaseSizeBeforeUpdate);
        TaskFindData testTaskFindData = taskFindDataList.get(taskFindDataList.size() - 1);
        assertThat(testTaskFindData.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingTaskFindData() throws Exception {
        int databaseSizeBeforeUpdate = taskFindDataRepository.findAll().size();

        // Create the TaskFindData

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTaskFindDataMockMvc.perform(put("/api/task-find-data")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(taskFindData)))
            .andExpect(status().isBadRequest());

        // Validate the TaskFindData in the database
        List<TaskFindData> taskFindDataList = taskFindDataRepository.findAll();
        assertThat(taskFindDataList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTaskFindData() throws Exception {
        // Initialize the database
        taskFindDataRepository.saveAndFlush(taskFindData);

        int databaseSizeBeforeDelete = taskFindDataRepository.findAll().size();

        // Delete the taskFindData
        restTaskFindDataMockMvc.perform(delete("/api/task-find-data/{id}", taskFindData.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TaskFindData> taskFindDataList = taskFindDataRepository.findAll();
        assertThat(taskFindDataList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TaskFindData.class);
        TaskFindData taskFindData1 = new TaskFindData();
        taskFindData1.setId(1L);
        TaskFindData taskFindData2 = new TaskFindData();
        taskFindData2.setId(taskFindData1.getId());
        assertThat(taskFindData1).isEqualTo(taskFindData2);
        taskFindData2.setId(2L);
        assertThat(taskFindData1).isNotEqualTo(taskFindData2);
        taskFindData1.setId(null);
        assertThat(taskFindData1).isNotEqualTo(taskFindData2);
    }
}
