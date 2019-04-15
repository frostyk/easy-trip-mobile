package com.frostyk.service.dto;

import com.frostyk.domain.Image;
import com.frostyk.domain.Tour;
import com.frostyk.domain.User;

import javax.persistence.*;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public class TourDTO {
    private Long id;

    private String title;

    private String description;

    private Long duration;


    private String placeId;

    private Long price;

    private UserDTO userDTO;

    private List<String> images;

    private Instant createdAt;

    public TourDTO(Tour tour) {
        this.id = tour.getId();
        this.title = tour.getTitle();
        this.description = tour.getDescription();
        this.duration = tour.getDuration();
        this.placeId = tour.getPlaceId();
        this.price = tour.getPrice();
        this.userDTO = new UserDTO(tour.getUser());
        this.images = tour.getImages().stream().map(Image::getUri).collect(Collectors.toList());
        this.createdAt = tour.getCreatedAt();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public String getPlaceId() {
        return placeId;
    }

    public void setPlaceId(String placeId) {
        this.placeId = placeId;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
