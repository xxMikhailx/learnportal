package com.litelife.learnportal.web.rest;

import com.litelife.learnportal.domain.Deck;
import com.litelife.learnportal.repository.DeckRepository;
import com.litelife.learnportal.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.github.perplexhub.rsql.RSQLSupport;

import org.apache.commons.lang3.StringUtils;
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
 * REST controller for managing {@link com.litelife.learnportal.domain.Deck}.
 */
@RestController
@RequestMapping("/api")
public class DeckResource {

    private final Logger log = LoggerFactory.getLogger(DeckResource.class);

    private static final String ENTITY_NAME = "deck";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeckRepository deckRepository;

    public DeckResource(DeckRepository deckRepository) {
        this.deckRepository = deckRepository;
    }

    /**
     * {@code POST  /decks} : Create a new deck.
     *
     * @param deck the deck to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deck, or with status {@code 400 (Bad Request)} if the deck has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/decks")
    public ResponseEntity<Deck> createDeck(@Valid @RequestBody Deck deck) throws URISyntaxException {
        log.debug("REST request to save Deck : {}", deck);
        if (deck.getId() != null) {
            throw new BadRequestAlertException("A new deck cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Deck result = deckRepository.save(deck);
        return ResponseEntity.created(new URI("/api/decks/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /decks} : Updates an existing deck.
     *
     * @param deck the deck to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deck,
     * or with status {@code 400 (Bad Request)} if the deck is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deck couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/decks")
    public ResponseEntity<Deck> updateDeck(@Valid @RequestBody Deck deck) throws URISyntaxException {
        log.debug("REST request to update Deck : {}", deck);
        if (deck.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Deck result = deckRepository.save(deck);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deck.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /decks} : get all the decks.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of decks in body.
     */
    @GetMapping("/decks")
    public ResponseEntity<List<Deck>> getAllDecks(Pageable pageable) {
        log.debug("REST request to get a page of Decks");
        Page<Deck> page = deckRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /decks/rsql} : get all the decks with RSQL.
     *
     * @param pageable the pagination information.
     * @param search   the search criteria.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of decks in body.
     */
    @GetMapping("/decks/rsql")
    public ResponseEntity<List<Deck>> getAllDecks(Pageable pageable, String search) {
        log.debug("REST request to get a page of Decks with RSQL");
        Page<Deck> page = null;
        if (StringUtils.isBlank(search)) {
            page = deckRepository.findAll(pageable);
        } else {
            page = deckRepository.findAll(RSQLSupport.toSpecification(search), pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /decks/:id} : get the "id" deck.
     *
     * @param id the id of the deck to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deck, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/decks/{id}")
    public ResponseEntity<Deck> getDeck(@PathVariable Long id) {
        log.debug("REST request to get Deck : {}", id);
        Optional<Deck> deck = deckRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deck);
    }

    /**
     * {@code DELETE  /decks/:id} : delete the "id" deck.
     *
     * @param id the id of the deck to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/decks/{id}")
    public ResponseEntity<Void> deleteDeck(@PathVariable Long id) {
        log.debug("REST request to delete Deck : {}", id);
        deckRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
