package com.litelife.learnportal.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Task.
 */
@Entity
@Table(name = "task")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Task implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "short_description")
    private String shortDescription;

    
    @Lob
    @Column(name = "task_description", nullable = false)
    private String taskDescription;

    
    @Lob
    @Column(name = "solution", nullable = false)
    private String solution;

    @OneToMany(mappedBy = "task")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TaskGivenData> givenData = new HashSet<>();

    @OneToMany(mappedBy = "task")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TaskFindData> findData = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("tasks")
    private Category category;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Task title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public Task shortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
        return this;
    }

    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public Task taskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
        return this;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getSolution() {
        return solution;
    }

    public Task solution(String solution) {
        this.solution = solution;
        return this;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public Set<TaskGivenData> getGivenData() {
        return givenData;
    }

    public Task givenData(Set<TaskGivenData> taskGivenData) {
        this.givenData = taskGivenData;
        return this;
    }

    public Task addGivenData(TaskGivenData taskGivenData) {
        this.givenData.add(taskGivenData);
        taskGivenData.setTask(this);
        return this;
    }

    public Task removeGivenData(TaskGivenData taskGivenData) {
        this.givenData.remove(taskGivenData);
        taskGivenData.setTask(null);
        return this;
    }

    public void setGivenData(Set<TaskGivenData> taskGivenData) {
        this.givenData = taskGivenData;
    }

    public Set<TaskFindData> getFindData() {
        return findData;
    }

    public Task findData(Set<TaskFindData> taskFindData) {
        this.findData = taskFindData;
        return this;
    }

    public Task addFindData(TaskFindData taskFindData) {
        this.findData.add(taskFindData);
        taskFindData.setTask(this);
        return this;
    }

    public Task removeFindData(TaskFindData taskFindData) {
        this.findData.remove(taskFindData);
        taskFindData.setTask(null);
        return this;
    }

    public void setFindData(Set<TaskFindData> taskFindData) {
        this.findData = taskFindData;
    }

    public Category getCategory() {
        return category;
    }

    public Task category(Category category) {
        this.category = category;
        return this;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Task)) {
            return false;
        }
        return id != null && id.equals(((Task) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Task{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", shortDescription='" + getShortDescription() + "'" +
            ", taskDescription='" + getTaskDescription() + "'" +
            ", solution='" + getSolution() + "'" +
            "}";
    }
}
