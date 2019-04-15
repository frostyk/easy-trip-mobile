package com.frostyk.web.rest;

import com.frostyk.domain.Tour;
import com.frostyk.service.TourService;
import com.frostyk.service.dto.TourDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TourResource {

    private final Logger log = LoggerFactory.getLogger(TourResource.class);

    private final TourService tourService;

    public TourResource(TourService tourService) {
        this.tourService = tourService;
    }

    @PostMapping("/tour")
    public ResponseEntity<Tour> create(@RequestBody Tour tour) {
        Tour saved = tourService.save(tour);
        return ResponseEntity.ok(saved);
    }
    @GetMapping("/tour/{placeId}")
    public ResponseEntity<Page<TourDTO>> listByPlaceId(@PathVariable String placeId) {
        Page<TourDTO> tours = tourService.getServicesByPlaceID(placeId);
        return ResponseEntity.ok(tours);
    }
}

