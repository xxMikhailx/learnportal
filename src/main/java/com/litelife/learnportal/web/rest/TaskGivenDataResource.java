package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.domain.TaskGivenData;
import com.litelife.learnportal.repository.TaskGivenDataRepository;
import com.litelife.learnportal.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.litelife.learnportal.domain.TaskGivenData}.
 */
@RestController
@RequestMapping("/api")
public class TaskGivenDataResource {

    private final Logger log = LoggerFactory.getLogger(TaskGivenDataResource.class);

    private static final String ENTITY_NAME = "taskGivenData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskGivenDataRepository taskGivenDataRepository;

    public TaskGivenDataResource(TaskGivenDataRepository taskGivenDataRepository) {
        this.taskGivenDataRepository = taskGivenDataRepository;
    }

    /**
     * {@code POST  /task-given-data} : Create a new taskGivenData.
     *
     * @param taskGivenData the taskGivenData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskGivenData, or with status {@code 400 (Bad Request)} if the taskGivenData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/task-given-data")
    public ResponseEntity<TaskGivenData> createTaskGivenData(@Valid @RequestBody TaskGivenData taskGivenData) throws URISyntaxException {
        log.debug("REST request to save TaskGivenData : {}", taskGivenData);
        if (taskGivenData.getId() != null) {
            throw new BadRequestAlertException("A new taskGivenData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskGivenData result = taskGivenDataRepository.save(taskGivenData);
        return ResponseEntity.created(new URI("/api/task-given-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-given-data} : Updates an existing taskGivenData.
     *
     * @param taskGivenData the taskGivenData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskGivenData,
     * or with status {@code 400 (Bad Request)} if the taskGivenData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskGivenData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/task-given-data")
    public ResponseEntity<TaskGivenData> updateTaskGivenData(@Valid @RequestBody TaskGivenData taskGivenData) throws URISyntaxException {
        log.debug("REST request to update TaskGivenData : {}", taskGivenData);
        if (taskGivenData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaskGivenData result = taskGivenDataRepository.save(taskGivenData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taskGivenData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /task-given-data} : get all the taskGivenData.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskGivenData in body.
     */
    @GetMapping("/task-given-data")
    public List<TaskGivenData> getAllTaskGivenData() {
        log.debug("REST request to get all TaskGivenData");
        return taskGivenDataRepository.findAll();
    }

    /**
     * {@code GET  /task-given-data/:id} : get the "id" taskGivenData.
     *
     * @param id the id of the taskGivenData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskGivenData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/task-given-data/{id}")
    public ResponseEntity<TaskGivenData> getTaskGivenData(@PathVariable Long id) {
        log.debug("REST request to get TaskGivenData : {}", id);
        Optional<TaskGivenData> taskGivenData = taskGivenDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskGivenData);
    }

    /**
     * {@code DELETE  /task-given-data/:id} : delete the "id" taskGivenData.
     *
     * @param id the id of the taskGivenData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/task-given-data/{id}")
    public ResponseEntity<Void> deleteTaskGivenData(@PathVariable Long id) {
        log.debug("REST request to delete TaskGivenData : {}", id);
        taskGivenDataRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
