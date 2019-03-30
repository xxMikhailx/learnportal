package com.litelife.learnportal.web.rest;
import com.litelife.learnportal.domain.Formula;
import com.litelife.learnportal.repository.FormulaRepository;
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
 * REST controller for managing Formula.
 */
@RestController
@RequestMapping("/api")
public class FormulaResource {

    private final Logger log = LoggerFactory.getLogger(FormulaResource.class);

    private static final String ENTITY_NAME = "formula";

    private final FormulaRepository formulaRepository;

    public FormulaResource(FormulaRepository formulaRepository) {
        this.formulaRepository = formulaRepository;
    }

    /**
     * POST  /formulas : Create a new formula.
     *
     * @param formula the formula to create
     * @return the ResponseEntity with status 201 (Created) and with body the new formula, or with status 400 (Bad Request) if the formula has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/formulas")
    public ResponseEntity<Formula> createFormula(@Valid @RequestBody Formula formula) throws URISyntaxException {
        log.debug("REST request to save Formula : {}", formula);
        if (formula.getId() != null) {
            throw new BadRequestAlertException("A new formula cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Formula result = formulaRepository.save(formula);
        return ResponseEntity.created(new URI("/api/formulas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /formulas : Updates an existing formula.
     *
     * @param formula the formula to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated formula,
     * or with status 400 (Bad Request) if the formula is not valid,
     * or with status 500 (Internal Server Error) if the formula couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/formulas")
    public ResponseEntity<Formula> updateFormula(@Valid @RequestBody Formula formula) throws URISyntaxException {
        log.debug("REST request to update Formula : {}", formula);
        if (formula.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Formula result = formulaRepository.save(formula);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, formula.getId().toString()))
            .body(result);
    }

    /**
     * GET  /formulas : get all the formulas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of formulas in body
     */
    @GetMapping("/formulas")
    public ResponseEntity<List<Formula>> getAllFormulas(Pageable pageable) {
        log.debug("REST request to get a page of Formulas");
        Page<Formula> page = formulaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/formulas");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /formulas/:id : get the "id" formula.
     *
     * @param id the id of the formula to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the formula, or with status 404 (Not Found)
     */
    @GetMapping("/formulas/{id}")
    public ResponseEntity<Formula> getFormula(@PathVariable Long id) {
        log.debug("REST request to get Formula : {}", id);
        Optional<Formula> formula = formulaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(formula);
    }

    /**
     * DELETE  /formulas/:id : delete the "id" formula.
     *
     * @param id the id of the formula to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/formulas/{id}")
    public ResponseEntity<Void> deleteFormula(@PathVariable Long id) {
        log.debug("REST request to delete Formula : {}", id);
        formulaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
