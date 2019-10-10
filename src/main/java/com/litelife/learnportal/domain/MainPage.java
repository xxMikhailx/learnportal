package com.litelife.learnportal.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A MainPage.
 */
@Entity
@Table(name = "main_page")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MainPage implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Lob
    @Column(name = "content", nullable = false)
    private String content;

    @NotNull
    @Column(name = "motto", nullable = false)
    private String motto;

    @OneToMany(mappedBy = "mainPage")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Contact> contacts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public MainPage content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getMotto() {
        return motto;
    }

    public MainPage motto(String motto) {
        this.motto = motto;
        return this;
    }

    public void setMotto(String motto) {
        this.motto = motto;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public MainPage contacts(Set<Contact> contacts) {
        this.contacts = contacts;
        return this;
    }

    public MainPage addContacts(Contact contact) {
        this.contacts.add(contact);
        contact.setMainPage(this);
        return this;
    }

    public MainPage removeContacts(Contact contact) {
        this.contacts.remove(contact);
        contact.setMainPage(null);
        return this;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MainPage)) {
            return false;
        }
        return id != null && id.equals(((MainPage) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "MainPage{" +
            "id=" + getId() +
            ", content='" + getContent() + "'" +
            ", motto='" + getMotto() + "'" +
            "}";
    }
}
