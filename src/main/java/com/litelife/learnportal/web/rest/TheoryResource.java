package com.litelife.learnportal.web.rest;
import com.litelife.learnportal.domain.Theory;
import com.litelife.learnportal.repository.TheoryRepository;
import com.litelife.learnportal.web.rest.errors.BadRequestAlertException;
import com.litelife.learnportal.web.rest.util.HeaderUtil;
import com.litelife.learnportal.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Theory.
 */
@RestController
@RequestMapping("/api")
public class TheoryResource {

    private final Logger log = LoggerFactory.getLogger(TheoryResource.class);

    private static final String ENTITY_NAME = "theory";

    private final TheoryRepository theoryRepository;

    public TheoryResource(TheoryRepository theoryRepository) {
        this.theoryRepository = theoryRepository;
    }

    /**
     * POST  /theories : Create a new theory.
     *
     * @param theory the theory to create
     * @return the ResponseEntity with status 201 (Created) and with body the new theory, or with status 400 (Bad Request) if the theory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/theories")
    public ResponseEntity<Theory> createTheory(@Valid @RequestBody Theory theory) throws URISyntaxException {
        log.debug("REST request to save Theory : {}", theory);
        if (theory.getId() != null) {
            throw new BadRequestAlertException("A new theory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Theory result = theoryRepository.save(theory);
        return ResponseEntity.created(new URI("/api/theories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /theories : Updates an existing theory.
     *
     * @param theory the theory to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated theory,
     * or with status 400 (Bad Request) if the theory is not valid,
     * or with status 500 (Internal Server Error) if the theory couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/theories")
    public ResponseEntity<Theory> updateTheory(@Valid @RequestBody Theory theory) throws URISyntaxException {
        log.debug("REST request to update Theory : {}", theory);
        if (theory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Theory result = theoryRepository.save(theory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, theory.getId().toString()))
            .body(result);
    }

    /**
     * GET  /theories : get all the theories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of theories in body
     */
    @GetMapping("/theories")
    public ResponseEntity<List<Theory>> getAllTheories(Pageable pageable) {
        log.debug("REST request to get a page of Theories");
        Page<Theory> page = theoryRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/theories");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /theories/:id : get the "id" theory.
     *
     * @param id the id of the theory to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the theory, or with status 404 (Not Found)
     */
    @GetMapping("/theories/{id}")
    public ResponseEntity<Theory> getTheory(@PathVariable Long id) {
        log.debug("REST request to get Theory : {}", id);
        Optional<Theory> theory = theoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(theory);
    }

    /**
     * DELETE  /theories/:id : delete the "id" theory.
     *
     * @param id the id of the theory to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/theories/{id}")
    public ResponseEntity<Void> deleteTheory(@PathVariable Long id) {
        log.debug("REST request to delete Theory : {}", id);
        theoryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
