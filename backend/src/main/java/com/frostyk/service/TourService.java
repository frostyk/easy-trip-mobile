package com.frostyk.service;

import com.frostyk.domain.Image;
import com.frostyk.domain.Tour;
import com.frostyk.repository.ImageRepository;
import com.frostyk.repository.TourRepository;
import com.frostyk.service.dto.TourDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TourService {
    private final TourRepository tourRepository;
    private final ImageRepository imageRepository;
    private final UserService userService;

    public TourService(TourRepository tourRepository, ImageRepository imageRepository, UserService userService) {
        this.tourRepository = tourRepository;
        this.imageRepository = imageRepository;
        this.userService = userService;
    }

    public Tour save(Tour tour) {
        Tour t = tourRepository.save(tour);
        Tour finalT = t;
        t.getImages().forEach(i -> i.setTour(finalT));
        t.setImages(t.getImages().stream().map(imageRepository::save).collect(Collectors.toList()));
        t.setUser(userService.getUserWithAuthorities().get());
        t.setCreatedAt(Instant.now());
        t = tourRepository.save(t);
        return t;
    }


    public Page<TourDTO> getServicesByPlaceID(String placeId) {
        return tourRepository.findAllByPlaceId(placeId, new PageRequest(0, 20, Sort.by("createdAt"))).map(TourDTO::new);
    }
}
