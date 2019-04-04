package com.frostyk.repository;

import com.frostyk.domain.Image;
import com.frostyk.domain.Tour;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface ImageRepository extends JpaRepository<Image, Long> {
}
