package com.litelife.learnportal.repository;
import com.litelife.learnportal.domain.Theory;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Theory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TheoryRepository extends JpaRepository<Theory, Long> {

}
