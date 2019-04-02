package com.frostyk.web.rest;
import com.frostyk.domain.Tour;
import com.frostyk.repository.TourRepository;
import com.frostyk.web.rest.errors.BadRequestAlertException;
import com.frostyk.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Tour.
 */
@RestController
@RequestMapping("/api")
public class TourResource {

    private final Logger log = LoggerFactory.getLogger(TourResource.class);

    private static final String ENTITY_NAME = "tour";

    private final TourRepository tourRepository;

    public TourResource(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    /**
     * POST  /tours : Create a new tour.
     *
     * @param tour the tour to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tour, or with status 400 (Bad Request) if the tour has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tours")
    public ResponseEntity<Tour> createTour(@RequestBody Tour tour) throws URISyntaxException {
        log.debug("REST request to save Tour : {}", tour);
        if (tour.getId() != null) {
            throw new BadRequestAlertException("A new tour cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Tour result = tourRepository.save(tour);
        return ResponseEntity.created(new URI("/api/tours/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tours : Updates an existing tour.
     *
     * @param tour the tour to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tour,
     * or with status 400 (Bad Request) if the tour is not valid,
     * or with status 500 (Internal Server Error) if the tour couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tours")
    public ResponseEntity<Tour> updateTour(@RequestBody Tour tour) throws URISyntaxException {
        log.debug("REST request to update Tour : {}", tour);
        if (tour.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Tour result = tourRepository.save(tour);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tour.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tours : get all the tours.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tours in body
     */
    @GetMapping("/tours")
    public List<Tour> getAllTours() {
        log.debug("REST request to get all Tours");
        return tourRepository.findAll();
    }

    /**
     * GET  /tours/:id : get the "id" tour.
     *
     * @param id the id of the tour to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tour, or with status 404 (Not Found)
     */
    @GetMapping("/tours/{id}")
    public ResponseEntity<Tour> getTour(@PathVariable Long id) {
        log.debug("REST request to get Tour : {}", id);
        Optional<Tour> tour = tourRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tour);
    }

    /**
     * DELETE  /tours/:id : delete the "id" tour.
     *
     * @param id the id of the tour to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tours/{id}")
    public ResponseEntity<Void> deleteTour(@PathVariable Long id) {
        log.debug("REST request to delete Tour : {}", id);
        tourRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
