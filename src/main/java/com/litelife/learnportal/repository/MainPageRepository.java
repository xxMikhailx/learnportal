package com.litelife.learnportal.repository;
import com.litelife.learnportal.domain.MainPage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the MainPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MainPageRepository extends JpaRepository<MainPage, Long> {

}
