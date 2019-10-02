package com.litelife.learnportal.repository;
import com.litelife.learnportal.domain.TaskGivenData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaskGivenData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskGivenDataRepository extends JpaRepository<TaskGivenData, Long> {

}
