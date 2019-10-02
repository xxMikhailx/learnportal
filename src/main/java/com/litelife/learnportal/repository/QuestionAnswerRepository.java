package com.litelife.learnportal.repository;
import com.litelife.learnportal.domain.QuestionAnswer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QuestionAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionAnswerRepository extends JpaRepository<QuestionAnswer, Long> {

}
