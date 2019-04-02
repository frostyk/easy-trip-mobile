package com.frostyk.web.rest;

import com.frostyk.BackendApp;

import com.frostyk.domain.EasyTripUser;
import com.frostyk.repository.EasyTripUserRepository;
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
import java.util.List;


import static com.frostyk.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EasyTripUserResource REST controller.
 *
 * @see EasyTripUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BackendApp.class)
public class EasyTripUserResourceIntTest {

    @Autowired
    private EasyTripUserRepository easyTripUserRepository;

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

    private MockMvc restEasyTripUserMockMvc;

    private EasyTripUser easyTripUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EasyTripUserResource easyTripUserResource = new EasyTripUserResource(easyTripUserRepository);
        this.restEasyTripUserMockMvc = MockMvcBuilders.standaloneSetup(easyTripUserResource)
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
    public static EasyTripUser createEntity(EntityManager em) {
        EasyTripUser easyTripUser = new EasyTripUser();
        return easyTripUser;
    }

    @Before
    public void initTest() {
        easyTripUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createEasyTripUser() throws Exception {
        int databaseSizeBeforeCreate = easyTripUserRepository.findAll().size();

        // Create the EasyTripUser
        restEasyTripUserMockMvc.perform(post("/api/easy-trip-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(easyTripUser)))
            .andExpect(status().isCreated());

        // Validate the EasyTripUser in the database
        List<EasyTripUser> easyTripUserList = easyTripUserRepository.findAll();
        assertThat(easyTripUserList).hasSize(databaseSizeBeforeCreate + 1);
        EasyTripUser testEasyTripUser = easyTripUserList.get(easyTripUserList.size() - 1);
    }

    @Test
    @Transactional
    public void createEasyTripUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = easyTripUserRepository.findAll().size();

        // Create the EasyTripUser with an existing ID
        easyTripUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEasyTripUserMockMvc.perform(post("/api/easy-trip-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(easyTripUser)))
            .andExpect(status().isBadRequest());

        // Validate the EasyTripUser in the database
        List<EasyTripUser> easyTripUserList = easyTripUserRepository.findAll();
        assertThat(easyTripUserList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllEasyTripUsers() throws Exception {
        // Initialize the database
        easyTripUserRepository.saveAndFlush(easyTripUser);

        // Get all the easyTripUserList
        restEasyTripUserMockMvc.perform(get("/api/easy-trip-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(easyTripUser.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getEasyTripUser() throws Exception {
        // Initialize the database
        easyTripUserRepository.saveAndFlush(easyTripUser);

        // Get the easyTripUser
        restEasyTripUserMockMvc.perform(get("/api/easy-trip-users/{id}", easyTripUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(easyTripUser.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingEasyTripUser() throws Exception {
        // Get the easyTripUser
        restEasyTripUserMockMvc.perform(get("/api/easy-trip-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEasyTripUser() throws Exception {
        // Initialize the database
        easyTripUserRepository.saveAndFlush(easyTripUser);

        int databaseSizeBeforeUpdate = easyTripUserRepository.findAll().size();

        // Update the easyTripUser
        EasyTripUser updatedEasyTripUser = easyTripUserRepository.findById(easyTripUser.getId()).get();
        // Disconnect from session so that the updates on updatedEasyTripUser are not directly saved in db
        em.detach(updatedEasyTripUser);

        restEasyTripUserMockMvc.perform(put("/api/easy-trip-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEasyTripUser)))
            .andExpect(status().isOk());

        // Validate the EasyTripUser in the database
        List<EasyTripUser> easyTripUserList = easyTripUserRepository.findAll();
        assertThat(easyTripUserList).hasSize(databaseSizeBeforeUpdate);
        EasyTripUser testEasyTripUser = easyTripUserList.get(easyTripUserList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingEasyTripUser() throws Exception {
        int databaseSizeBeforeUpdate = easyTripUserRepository.findAll().size();

        // Create the EasyTripUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEasyTripUserMockMvc.perform(put("/api/easy-trip-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(easyTripUser)))
            .andExpect(status().isBadRequest());

        // Validate the EasyTripUser in the database
        List<EasyTripUser> easyTripUserList = easyTripUserRepository.findAll();
        assertThat(easyTripUserList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEasyTripUser() throws Exception {
        // Initialize the database
        easyTripUserRepository.saveAndFlush(easyTripUser);

        int databaseSizeBeforeDelete = easyTripUserRepository.findAll().size();

        // Delete the easyTripUser
        restEasyTripUserMockMvc.perform(delete("/api/easy-trip-users/{id}", easyTripUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<EasyTripUser> easyTripUserList = easyTripUserRepository.findAll();
        assertThat(easyTripUserList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EasyTripUser.class);
        EasyTripUser easyTripUser1 = new EasyTripUser();
        easyTripUser1.setId(1L);
        EasyTripUser easyTripUser2 = new EasyTripUser();
        easyTripUser2.setId(easyTripUser1.getId());
        assertThat(easyTripUser1).isEqualTo(easyTripUser2);
        easyTripUser2.setId(2L);
        assertThat(easyTripUser1).isNotEqualTo(easyTripUser2);
        easyTripUser1.setId(null);
        assertThat(easyTripUser1).isNotEqualTo(easyTripUser2);
    }
}
