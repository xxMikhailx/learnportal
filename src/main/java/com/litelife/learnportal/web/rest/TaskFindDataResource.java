package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.domain.TaskFindData;
import com.litelife.learnportal.repository.TaskFindDataRepository;
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
 * REST controller for managing {@link com.litelife.learnportal.domain.TaskFindData}.
 */
@RestController
@RequestMapping("/api")
public class TaskFindDataResource {

    private final Logger log = LoggerFactory.getLogger(TaskFindDataResource.class);

    private static final String ENTITY_NAME = "taskFindData";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TaskFindDataRepository taskFindDataRepository;

    public TaskFindDataResource(TaskFindDataRepository taskFindDataRepository) {
        this.taskFindDataRepository = taskFindDataRepository;
    }

    /**
     * {@code POST  /task-find-data} : Create a new taskFindData.
     *
     * @param taskFindData the taskFindData to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new taskFindData, or with status {@code 400 (Bad Request)} if the taskFindData has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/task-find-data")
    public ResponseEntity<TaskFindData> createTaskFindData(@Valid @RequestBody TaskFindData taskFindData) throws URISyntaxException {
        log.debug("REST request to save TaskFindData : {}", taskFindData);
        if (taskFindData.getId() != null) {
            throw new BadRequestAlertException("A new taskFindData cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TaskFindData result = taskFindDataRepository.save(taskFindData);
        return ResponseEntity.created(new URI("/api/task-find-data/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /task-find-data} : Updates an existing taskFindData.
     *
     * @param taskFindData the taskFindData to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated taskFindData,
     * or with status {@code 400 (Bad Request)} if the taskFindData is not valid,
     * or with status {@code 500 (Internal Server Error)} if the taskFindData couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/task-find-data")
    public ResponseEntity<TaskFindData> updateTaskFindData(@Valid @RequestBody TaskFindData taskFindData) throws URISyntaxException {
        log.debug("REST request to update TaskFindData : {}", taskFindData);
        if (taskFindData.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TaskFindData result = taskFindDataRepository.save(taskFindData);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, taskFindData.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /task-find-data} : get all the taskFindData.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of taskFindData in body.
     */
    @GetMapping("/task-find-data")
    public List<TaskFindData> getAllTaskFindData() {
        log.debug("REST request to get all TaskFindData");
        return taskFindDataRepository.findAll();
    }

    /**
     * {@code GET  /task-find-data/:id} : get the "id" taskFindData.
     *
     * @param id the id of the taskFindData to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the taskFindData, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/task-find-data/{id}")
    public ResponseEntity<TaskFindData> getTaskFindData(@PathVariable Long id) {
        log.debug("REST request to get TaskFindData : {}", id);
        Optional<TaskFindData> taskFindData = taskFindDataRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(taskFindData);
    }

    /**
     * {@code DELETE  /task-find-data/:id} : delete the "id" taskFindData.
     *
     * @param id the id of the taskFindData to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/task-find-data/{id}")
    public ResponseEntity<Void> deleteTaskFindData(@PathVariable Long id) {
        log.debug("REST request to delete TaskFindData : {}", id);
        taskFindDataRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
