package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.domain.Quiz;
import com.litelife.learnportal.repository.QuizRepository;
import com.litelife.learnportal.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.litelife.learnportal.domain.Quiz}.
 */
@RestController
@RequestMapping("/api")
public class QuizResource {

    private final Logger log = LoggerFactory.getLogger(QuizResource.class);

    private static final String ENTITY_NAME = "quiz";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuizRepository quizRepository;

    public QuizResource(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    /**
     * {@code POST  /quizzes} : Create a new quiz.
     *
     * @param quiz the quiz to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quiz, or with status {@code 400 (Bad Request)} if the quiz has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/quizzes")
    public ResponseEntity<Quiz> createQuiz(@Valid @RequestBody Quiz quiz) throws URISyntaxException {
        log.debug("REST request to save Quiz : {}", quiz);
        if (quiz.getId() != null) {
            throw new BadRequestAlertException("A new quiz cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Quiz result = quizRepository.save(quiz);
        return ResponseEntity.created(new URI("/api/quizzes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /quizzes} : Updates an existing quiz.
     *
     * @param quiz the quiz to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quiz,
     * or with status {@code 400 (Bad Request)} if the quiz is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quiz couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/quizzes")
    public ResponseEntity<Quiz> updateQuiz(@Valid @RequestBody Quiz quiz) throws URISyntaxException {
        log.debug("REST request to update Quiz : {}", quiz);
        if (quiz.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Quiz result = quizRepository.save(quiz);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quiz.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /quizzes} : get all the quizzes.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizzes in body.
     */
    @GetMapping("/quizzes")
    public ResponseEntity<List<Quiz>> getAllQuizzes(Pageable pageable) {
        log.debug("REST request to get a page of Quizzes");
        Page<Quiz> page = quizRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quizzes/:id} : get the "id" quiz.
     *
     * @param id the id of the quiz to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quiz, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/quizzes/{id}")
    public ResponseEntity<Quiz> getQuiz(@PathVariable Long id) {
        log.debug("REST request to get Quiz : {}", id);
        Optional<Quiz> quiz = quizRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(quiz);
    }

    /**
     * {@code DELETE  /quizzes/:id} : delete the "id" quiz.
     *
     * @param id the id of the quiz to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/quizzes/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        log.debug("REST request to delete Quiz : {}", id);
        quizRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
