package com.litelife.learnportal.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.litelife.learnportal.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Category.class.getName() + ".theories", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Category.class.getName() + ".formulas", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Category.class.getName() + ".decks", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Category.class.getName() + ".tasks", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Category.class.getName() + ".quizzes", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Theory.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Formula.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Deck.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Task.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Task.class.getName() + ".givenData", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Task.class.getName() + ".findData", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.TaskGivenData.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.TaskFindData.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Quiz.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.Quiz.class.getName() + ".questions", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.QuizQuestion.class.getName(), jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.QuizQuestion.class.getName() + ".answers", jcacheConfiguration);
            cm.createCache(com.litelife.learnportal.domain.QuestionAnswer.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
