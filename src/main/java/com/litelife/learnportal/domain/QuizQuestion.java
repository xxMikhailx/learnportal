package com.litelife.learnportal.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A QuizQuestion.
 */
@Entity
@Table(name = "quiz_question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class QuizQuestion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "text", nullable = false)
    private String text;

    @Lob
    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "question")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<QuestionAnswer> answers = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("questions")
    private Quiz quiz;

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

    public QuizQuestion text(String text) {
        this.text = text;
        return this;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getDescription() {
        return description;
    }

    public QuizQuestion description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<QuestionAnswer> getAnswers() {
        return answers;
    }

    public QuizQuestion answers(Set<QuestionAnswer> questionAnswers) {
        this.answers = questionAnswers;
        return this;
    }

    public QuizQuestion addAnswers(QuestionAnswer questionAnswer) {
        this.answers.add(questionAnswer);
        questionAnswer.setQuestion(this);
        return this;
    }

    public QuizQuestion removeAnswers(QuestionAnswer questionAnswer) {
        this.answers.remove(questionAnswer);
        questionAnswer.setQuestion(null);
        return this;
    }

    public void setAnswers(Set<QuestionAnswer> questionAnswers) {
        this.answers = questionAnswers;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public QuizQuestion quiz(Quiz quiz) {
        this.quiz = quiz;
        return this;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
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
        QuizQuestion quizQuestion = (QuizQuestion) o;
        if (quizQuestion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), quizQuestion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "QuizQuestion{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
