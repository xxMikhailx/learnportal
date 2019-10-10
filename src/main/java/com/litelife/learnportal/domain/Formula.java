package com.litelife.learnportal.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Formula.
 */
@Entity
@Table(name = "formula")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Formula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @NotNull
    @Size(max = 1024)
    @Column(name = "equation", length = 1024, nullable = false)
    private String equation;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("formulas")
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

    public Formula title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Formula description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEquation() {
        return equation;
    }

    public Formula equation(String equation) {
        this.equation = equation;
        return this;
    }

    public void setEquation(String equation) {
        this.equation = equation;
    }

    public Category getCategory() {
        return category;
    }

    public Formula category(Category category) {
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
        if (!(o instanceof Formula)) {
            return false;
        }
        return id != null && id.equals(((Formula) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Formula{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", equation='" + getEquation() + "'" +
            "}";
    }
}
