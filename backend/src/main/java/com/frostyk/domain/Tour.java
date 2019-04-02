package com.frostyk.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Tour.
 */
@Entity
@Table(name = "tour")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tour implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Long price;

    @Column(name = "duration")
    private Long duration;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @OneToMany(mappedBy = "tour")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Image> images = new HashSet<>();
    @OneToMany(mappedBy = "tour")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Review> reviews = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("tours")
    private User easyTripUser;

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

    public Tour title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Tour description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getPrice() {
        return price;
    }

    public Tour price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Long getDuration() {
        return duration;
    }

    public Tour duration(Long duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public Tour createdAt(Instant createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public Tour updatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<Image> getImages() {
        return images;
    }

    public Tour images(Set<Image> images) {
        this.images = images;
        return this;
    }

    public Tour addImage(Image image) {
        this.images.add(image);
        image.setTour(this);
        return this;
    }

    public Tour removeImage(Image image) {
        this.images.remove(image);
        image.setTour(null);
        return this;
    }

    public void setImages(Set<Image> images) {
        this.images = images;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public Tour reviews(Set<Review> reviews) {
        this.reviews = reviews;
        return this;
    }

    public Tour addReview(Review review) {
        this.reviews.add(review);
        review.setTour(this);
        return this;
    }

    public Tour removeReview(Review review) {
        this.reviews.remove(review);
        review.setTour(null);
        return this;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }

    public User getEasyTripUser() {
        return easyTripUser;
    }

    public Tour easyTripUser(User easyTripUser) {
        this.easyTripUser = easyTripUser;
        return this;
    }

    public void setEasyTripUser(User easyTripUser) {
        this.easyTripUser = easyTripUser;
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
        Tour tour = (Tour) o;
        if (tour.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tour.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tour{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", price=" + getPrice() +
            ", duration=" + getDuration() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
