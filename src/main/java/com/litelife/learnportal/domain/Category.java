package com.litelife.learnportal.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Category.
 */
@Entity
@Table(name = "category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Category implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "short_name")
    private String shortName;

    @NotNull
    @Column(name = "full_name", nullable = false)
    private String fullName;

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Theory> theories = new HashSet<>();

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Formula> formulas = new HashSet<>();

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Deck> decks = new HashSet<>();

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Task> tasks = new HashSet<>();

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Quiz> quizzes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getShortName() {
        return shortName;
    }

    public Category shortName(String shortName) {
        this.shortName = shortName;
        return this;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getFullName() {
        return fullName;
    }

    public Category fullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Set<Theory> getTheories() {
        return theories;
    }

    public Category theories(Set<Theory> theories) {
        this.theories = theories;
        return this;
    }

    public Category addTheories(Theory theory) {
        this.theories.add(theory);
        theory.setCategory(this);
        return this;
    }

    public Category removeTheories(Theory theory) {
        this.theories.remove(theory);
        theory.setCategory(null);
        return this;
    }

    public void setTheories(Set<Theory> theories) {
        this.theories = theories;
    }

    public Set<Formula> getFormulas() {
        return formulas;
    }

    public Category formulas(Set<Formula> formulas) {
        this.formulas = formulas;
        return this;
    }

    public Category addFormulas(Formula formula) {
        this.formulas.add(formula);
        formula.setCategory(this);
        return this;
    }

    public Category removeFormulas(Formula formula) {
        this.formulas.remove(formula);
        formula.setCategory(null);
        return this;
    }

    public void setFormulas(Set<Formula> formulas) {
        this.formulas = formulas;
    }

    public Set<Deck> getDecks() {
        return decks;
    }

    public Category decks(Set<Deck> decks) {
        this.decks = decks;
        return this;
    }

    public Category addDecks(Deck deck) {
        this.decks.add(deck);
        deck.setCategory(this);
        return this;
    }

    public Category removeDecks(Deck deck) {
        this.decks.remove(deck);
        deck.setCategory(null);
        return this;
    }

    public void setDecks(Set<Deck> decks) {
        this.decks = decks;
    }

    public Set<Task> getTasks() {
        return tasks;
    }

    public Category tasks(Set<Task> tasks) {
        this.tasks = tasks;
        return this;
    }

    public Category addTasks(Task task) {
        this.tasks.add(task);
        task.setCategory(this);
        return this;
    }

    public Category removeTasks(Task task) {
        this.tasks.remove(task);
        task.setCategory(null);
        return this;
    }

    public void setTasks(Set<Task> tasks) {
        this.tasks = tasks;
    }

    public Set<Quiz> getQuizzes() {
        return quizzes;
    }

    public Category quizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
        return this;
    }

    public Category addQuizzes(Quiz quiz) {
        this.quizzes.add(quiz);
        quiz.setCategory(this);
        return this;
    }

    public Category removeQuizzes(Quiz quiz) {
        this.quizzes.remove(quiz);
        quiz.setCategory(null);
        return this;
    }

    public void setQuizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Category)) {
            return false;
        }
        return id != null && id.equals(((Category) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Category{" +
            "id=" + getId() +
            ", shortName='" + getShortName() + "'" +
            ", fullName='" + getFullName() + "'" +
            "}";
    }
}
