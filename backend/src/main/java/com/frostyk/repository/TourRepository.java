package com.frostyk.repository;

import com.frostyk.domain.Authority;
import com.frostyk.domain.Tour;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface TourRepository extends JpaRepository<Tour, Long> {
    Page<Tour> findAllByPlaceId(String placeId, Pageable pageable);
}
