package com.litelife.learnportal.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A QuestionAnswer.
 */
@Entity
@Table(name = "question_answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QuestionAnswer implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @NotNull
    @Column(name = "correct", nullable = false)
    private Boolean correct;

    @ManyToOne
    @JsonIgnoreProperties("answers")
    private QuizQuestion question;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public QuestionAnswer text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Boolean isCorrect() {
        return correct;
    }

    public QuestionAnswer correct(Boolean correct) {
        this.correct = correct;
        return this;
    }

    public void setCorrect(Boolean correct) {
        this.correct = correct;
    }

    public QuizQuestion getQuestion() {
        return question;
    }

    public QuestionAnswer question(QuizQuestion quizQuestion) {
        this.question = quizQuestion;
        return this;
    }

    public void setQuestion(QuizQuestion quizQuestion) {
        this.question = quizQuestion;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        QuestionAnswer questionAnswer = (QuestionAnswer) o;
        if (questionAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), questionAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuestionAnswer{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", correct='" + isCorrect() + "'" +
            "}";
    }
}
