package com.litelife.learnportal.repository;

import com.litelife.learnportal.domain.Deck;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Deck entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeckRepository extends JpaRepository<Deck, Long> {

}
