package com.litelife.learnportal.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Deck.
 */
@Entity
@Table(name = "deck")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Deck implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    
    @Lob
    @Column(name = "deck", nullable = false)
    private byte[] deck;

    @Column(name = "deck_content_type", nullable = false)
    private String deckContentType;

    @ManyToOne
    @JsonIgnoreProperties("decks")
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

    public Deck title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Deck description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getDeck() {
        return deck;
    }

    public Deck deck(byte[] deck) {
        this.deck = deck;
        return this;
    }

    public void setDeck(byte[] deck) {
        this.deck = deck;
    }

    public String getDeckContentType() {
        return deckContentType;
    }

    public Deck deckContentType(String deckContentType) {
        this.deckContentType = deckContentType;
        return this;
    }

    public void setDeckContentType(String deckContentType) {
        this.deckContentType = deckContentType;
    }

    public Category getCategory() {
        return category;
    }

    public Deck category(Category category) {
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
        if (!(o instanceof Deck)) {
            return false;
        }
        return id != null && id.equals(((Deck) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Deck{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", deck='" + getDeck() + "'" +
            ", deckContentType='" + getDeckContentType() + "'" +
            "}";
    }
}
