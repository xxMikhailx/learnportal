package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.domain.QuestionAnswer;
import com.litelife.learnportal.repository.QuestionAnswerRepository;
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
 * REST controller for managing {@link com.litelife.learnportal.domain.QuestionAnswer}.
 */
@RestController
@RequestMapping("/api")
public class QuestionAnswerResource {

    private final Logger log = LoggerFactory.getLogger(QuestionAnswerResource.class);

    private static final String ENTITY_NAME = "questionAnswer";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionAnswerRepository questionAnswerRepository;

    public QuestionAnswerResource(QuestionAnswerRepository questionAnswerRepository) {
        this.questionAnswerRepository = questionAnswerRepository;
    }

    /**
     * {@code POST  /question-answers} : Create a new questionAnswer.
     *
     * @param questionAnswer the questionAnswer to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionAnswer, or with status {@code 400 (Bad Request)} if the questionAnswer has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/question-answers")
    public ResponseEntity<QuestionAnswer> createQuestionAnswer(@Valid @RequestBody QuestionAnswer questionAnswer) throws URISyntaxException {
        log.debug("REST request to save QuestionAnswer : {}", questionAnswer);
        if (questionAnswer.getId() != null) {
            throw new BadRequestAlertException("A new questionAnswer cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuestionAnswer result = questionAnswerRepository.save(questionAnswer);
        return ResponseEntity.created(new URI("/api/question-answers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /question-answers} : Updates an existing questionAnswer.
     *
     * @param questionAnswer the questionAnswer to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionAnswer,
     * or with status {@code 400 (Bad Request)} if the questionAnswer is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionAnswer couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/question-answers")
    public ResponseEntity<QuestionAnswer> updateQuestionAnswer(@Valid @RequestBody QuestionAnswer questionAnswer) throws URISyntaxException {
        log.debug("REST request to update QuestionAnswer : {}", questionAnswer);
        if (questionAnswer.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuestionAnswer result = questionAnswerRepository.save(questionAnswer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionAnswer.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /question-answers} : get all the questionAnswers.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionAnswers in body.
     */
    @GetMapping("/question-answers")
    public List<QuestionAnswer> getAllQuestionAnswers() {
        log.debug("REST request to get all QuestionAnswers");
        return questionAnswerRepository.findAll();
    }

    /**
     * {@code GET  /question-answers/:id} : get the "id" questionAnswer.
     *
     * @param id the id of the questionAnswer to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionAnswer, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/question-answers/{id}")
    public ResponseEntity<QuestionAnswer> getQuestionAnswer(@PathVariable Long id) {
        log.debug("REST request to get QuestionAnswer : {}", id);
        Optional<QuestionAnswer> questionAnswer = questionAnswerRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(questionAnswer);
    }

    /**
     * {@code DELETE  /question-answers/:id} : delete the "id" questionAnswer.
     *
     * @param id the id of the questionAnswer to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/question-answers/{id}")
    public ResponseEntity<Void> deleteQuestionAnswer(@PathVariable Long id) {
        log.debug("REST request to delete QuestionAnswer : {}", id);
        questionAnswerRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
