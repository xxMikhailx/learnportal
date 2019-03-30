package com.litelife.learnportal.web.rest;
import com.litelife.learnportal.domain.TaskGivenData;
import com.litelife.learnportal.repository.TaskGivenDataRepository;
import com.litelife.learnportal.web.rest.errors.BadRequestAlertException;
import com.litelife.learnportal.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing TaskGivenData.
 */
@RestController
@RequestMapping("/api")
public class TaskGivenDataResource {

    private final Logger log = LoggerFactory.getLogger(TaskGivenDataResource.class);

    private static final String ENTITY_NAME = "taskGivenData";

    private final TaskGivenDataRepository taskGivenDataRepository;

    public TaskGivenDataResource(TaskGivenDataRepository taskGivenDataRepository) {
        this.taskGivenDataRepository = taskGivenDataRepository;
    }

    /**
     * POST  /task-given-data : Create a new taskGivenData.
     *
     * @param taskGivenData the taskGivenData to create
     * @return the ResponseEntity with status 201 (Created) and with body the new taskGivenData, or with status 400 (Bad Request) if the taskGivenData has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/task-given-data")
    public ResponseEntity<TaskGivenData> createTaskGivenData(@Valid @RequestBody TaskGivenData taskGivenData) throws URISyntaxException {
        log.debug("REST request to save TaskGivenData : {}", taskGivenData);
        if (taskGivenData.getId() != null) {
            throw new BadRequestAlertException("A new taskGivenData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskGivenData result = taskGivenDataRepository.save(taskGivenData);
        return ResponseEntity.created(new URI("/api/task-given-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /task-given-data : Updates an existing taskGivenData.
     *
     * @param taskGivenData the taskGivenData to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated taskGivenData,
     * or with status 400 (Bad Request) if the taskGivenData is not valid,
     * or with status 500 (Internal Server Error) if the taskGivenData couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/task-given-data")
    public ResponseEntity<TaskGivenData> updateTaskGivenData(@Valid @RequestBody TaskGivenData taskGivenData) throws URISyntaxException {
        log.debug("REST request to update TaskGivenData : {}", taskGivenData);
        if (taskGivenData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaskGivenData result = taskGivenDataRepository.save(taskGivenData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, taskGivenData.getId().toString()))
            .body(result);
    }

    /**
     * GET  /task-given-data : get all the taskGivenData.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of taskGivenData in body
     */
    @GetMapping("/task-given-data")
    public List<TaskGivenData> getAllTaskGivenData() {
        log.debug("REST request to get all TaskGivenData");
        return taskGivenDataRepository.findAll();
    }

    /**
     * GET  /task-given-data/:id : get the "id" taskGivenData.
     *
     * @param id the id of the taskGivenData to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the taskGivenData, or with status 404 (Not Found)
     */
    @GetMapping("/task-given-data/{id}")
    public ResponseEntity<TaskGivenData> getTaskGivenData(@PathVariable Long id) {
        log.debug("REST request to get TaskGivenData : {}", id);
        Optional<TaskGivenData> taskGivenData = taskGivenDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskGivenData);
    }

    /**
     * DELETE  /task-given-data/:id : delete the "id" taskGivenData.
     *
     * @param id the id of the taskGivenData to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/task-given-data/{id}")
    public ResponseEntity<Void> deleteTaskGivenData(@PathVariable Long id) {
        log.debug("REST request to delete TaskGivenData : {}", id);
        taskGivenDataRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
