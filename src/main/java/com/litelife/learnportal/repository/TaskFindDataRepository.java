package com.litelife.learnportal.repository;
import com.litelife.learnportal.domain.TaskFindData;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TaskFindData entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TaskFindDataRepository extends JpaRepository<TaskFindData, Long> {

}
