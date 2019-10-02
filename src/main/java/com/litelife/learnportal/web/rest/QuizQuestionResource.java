package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.domain.QuizQuestion;
import com.litelife.learnportal.repository.QuizQuestionRepository;
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
 * REST controller for managing {@link com.litelife.learnportal.domain.QuizQuestion}.
 */
@RestController
@RequestMapping("/api")
public class QuizQuestionResource {

    private final Logger log = LoggerFactory.getLogger(QuizQuestionResource.class);

    private static final String ENTITY_NAME = "quizQuestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuizQuestionRepository quizQuestionRepository;

    public QuizQuestionResource(QuizQuestionRepository quizQuestionRepository) {
        this.quizQuestionRepository = quizQuestionRepository;
    }

    /**
     * {@code POST  /quiz-questions} : Create a new quizQuestion.
     *
     * @param quizQuestion the quizQuestion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quizQuestion, or with status {@code 400 (Bad Request)} if the quizQuestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quiz-questions")
    public ResponseEntity<QuizQuestion> createQuizQuestion(@Valid @RequestBody QuizQuestion quizQuestion) throws URISyntaxException {
        log.debug("REST request to save QuizQuestion : {}", quizQuestion);
        if (quizQuestion.getId() != null) {
            throw new BadRequestAlertException("A new quizQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QuizQuestion result = quizQuestionRepository.save(quizQuestion);
        return ResponseEntity.created(new URI("/api/quiz-questions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /quiz-questions} : Updates an existing quizQuestion.
     *
     * @param quizQuestion the quizQuestion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizQuestion,
     * or with status {@code 400 (Bad Request)} if the quizQuestion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quizQuestion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quiz-questions")
    public ResponseEntity<QuizQuestion> updateQuizQuestion(@Valid @RequestBody QuizQuestion quizQuestion) throws URISyntaxException {
        log.debug("REST request to update QuizQuestion : {}", quizQuestion);
        if (quizQuestion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QuizQuestion result = quizQuestionRepository.save(quizQuestion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizQuestion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /quiz-questions} : get all the quizQuestions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizQuestions in body.
     */
    @GetMapping("/quiz-questions")
    public List<QuizQuestion> getAllQuizQuestions() {
        log.debug("REST request to get all QuizQuestions");
        return quizQuestionRepository.findAll();
    }

    /**
     * {@code GET  /quiz-questions/:id} : get the "id" quizQuestion.
     *
     * @param id the id of the quizQuestion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizQuestion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quiz-questions/{id}")
    public ResponseEntity<QuizQuestion> getQuizQuestion(@PathVariable Long id) {
        log.debug("REST request to get QuizQuestion : {}", id);
        Optional<QuizQuestion> quizQuestion = quizQuestionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(quizQuestion);
    }

    /**
     * {@code DELETE  /quiz-questions/:id} : delete the "id" quizQuestion.
     *
     * @param id the id of the quizQuestion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quiz-questions/{id}")
    public ResponseEntity<Void> deleteQuizQuestion(@PathVariable Long id) {
        log.debug("REST request to delete QuizQuestion : {}", id);
        quizQuestionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
