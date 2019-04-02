package com.frostyk.web.rest;

import com.frostyk.BackendApp;

import com.frostyk.domain.Tour;
import com.frostyk.repository.TourRepository;
import com.frostyk.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.frostyk.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TourResource REST controller.
 *
 * @see TourResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApp.class)
public class TourResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;

    private static final Long DEFAULT_DURATION = 1L;
    private static final Long UPDATED_DURATION = 2L;

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restTourMockMvc;

    private Tour tour;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TourResource tourResource = new TourResource(tourRepository);
        this.restTourMockMvc = MockMvcBuilders.standaloneSetup(tourResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tour createEntity(EntityManager em) {
        Tour tour = new Tour()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .price(DEFAULT_PRICE)
            .duration(DEFAULT_DURATION)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return tour;
    }

    @Before
    public void initTest() {
        tour = createEntity(em);
    }

    @Test
    @Transactional
    public void createTour() throws Exception {
        int databaseSizeBeforeCreate = tourRepository.findAll().size();

        // Create the Tour
        restTourMockMvc.perform(post("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tour)))
            .andExpect(status().isCreated());

        // Validate the Tour in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeCreate + 1);
        Tour testTour = tourList.get(tourList.size() - 1);
        assertThat(testTour.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testTour.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testTour.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testTour.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testTour.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testTour.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createTourWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tourRepository.findAll().size();

        // Create the Tour with an existing ID
        tour.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTourMockMvc.perform(post("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tour)))
            .andExpect(status().isBadRequest());

        // Validate the Tour in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTours() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);

        // Get all the tourList
        restTourMockMvc.perform(get("/api/tours?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tour.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    
    @Test
    @Transactional
    public void getTour() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);

        // Get the tour
        restTourMockMvc.perform(get("/api/tours/{id}", tour.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tour.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.intValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTour() throws Exception {
        // Get the tour
        restTourMockMvc.perform(get("/api/tours/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTour() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);

        int databaseSizeBeforeUpdate = tourRepository.findAll().size();

        // Update the tour
        Tour updatedTour = tourRepository.findById(tour.getId()).get();
        // Disconnect from session so that the updates on updatedTour are not directly saved in db
        em.detach(updatedTour);
        updatedTour
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .price(UPDATED_PRICE)
            .duration(UPDATED_DURATION)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restTourMockMvc.perform(put("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTour)))
            .andExpect(status().isOk());

        // Validate the Tour in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeUpdate);
        Tour testTour = tourList.get(tourList.size() - 1);
        assertThat(testTour.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testTour.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testTour.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testTour.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testTour.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testTour.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingTour() throws Exception {
        int databaseSizeBeforeUpdate = tourRepository.findAll().size();

        // Create the Tour

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTourMockMvc.perform(put("/api/tours")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tour)))
            .andExpect(status().isBadRequest());

        // Validate the Tour in the database
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTour() throws Exception {
        // Initialize the database
        tourRepository.saveAndFlush(tour);

        int databaseSizeBeforeDelete = tourRepository.findAll().size();

        // Delete the tour
        restTourMockMvc.perform(delete("/api/tours/{id}", tour.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tour> tourList = tourRepository.findAll();
        assertThat(tourList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tour.class);
        Tour tour1 = new Tour();
        tour1.setId(1L);
        Tour tour2 = new Tour();
        tour2.setId(tour1.getId());
        assertThat(tour1).isEqualTo(tour2);
        tour2.setId(2L);
        assertThat(tour1).isNotEqualTo(tour2);
        tour1.setId(null);
        assertThat(tour1).isNotEqualTo(tour2);
    }
}
