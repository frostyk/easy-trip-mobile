package com.frostyk.service;

import com.frostyk.domain.Image;
import com.frostyk.domain.Tour;
import com.frostyk.repository.ImageRepository;
import com.frostyk.repository.TourRepository;
import org.springframework.stereotype.Service;

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
        t = tourRepository.save(t);
        return t;
    }


}
