package com.silvesterhasani.lufthansatestbackend.controller;

import com.silvesterhasani.lufthansatestbackend.exception.ResourceNotFoundException;
import com.silvesterhasani.lufthansatestbackend.model.Applications;
import com.silvesterhasani.lufthansatestbackend.repository.ApplicationRepository;
import com.silvesterhasani.lufthansatestbackend.repository.UserRepository;
import com.silvesterhasani.lufthansatestbackend.repository.UserVacationDataRepository;
import com.silvesterhasani.lufthansatestbackend.services.WorkDaysFinder;
import org.slf4j.Logger;

import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class ApplicationController {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicationController.class);
    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final UserVacationDataRepository userVacationDataRepository;

    public ApplicationController(UserRepository userRepository, ApplicationRepository applicationRepository, UserVacationDataRepository userVacationDataRepository, JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.userVacationDataRepository = userVacationDataRepository;
        this.javaMailSender = javaMailSender;
    }

    //get all applications for User
    @GetMapping("/application{token}")
    public List<Applications> getAllApplications(@PathVariable String token){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
         return applicationRepository.findByUsername(username);
    }
    @GetMapping("/applicationVacations{token}")
    public Long getVacationData(@PathVariable String token){
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        long id =  userRepository.findByUsername(username).getId();
        long VacationData = userVacationDataRepository.findById(id).get().getDays();
        return VacationData;
    }

    // create application rest api
    @PostMapping("/application{token}")
    public String createApplication(@RequestBody Applications application,@PathVariable String token) {
        String username = application.getUsername();

        Long idUser = userRepository.findByUsername(username).getId();
        Long noDays = userVacationDataRepository.findById(idUser).get().getDays();
        Date startDateUser =  userRepository.findByUsername(username).getStartDate();
        int Workdays = WorkDaysFinder.getWorkingDaysBetweenTwoDates(application.getStartDate(), application.getEndDate());
        if ((noDays - Workdays) > 0) {
            Date now = new Date();
            long daysBetween = startDateUser.getTime() - now.getTime();
            if (TimeUnit.DAYS.convert(daysBetween, TimeUnit.MILLISECONDS)>90) {
               applicationRepository.save(application);
               LOGGER.info("Added a new Application for user " + username);
               return "Application Saved";
            } else {
                return  "Probation period hasn't finished";

            }
        } else {
            return  "Not enough Vacation days remaining";
        }
    }

    //get application by id rest api
    @GetMapping("/application/{id}{token}")
    public ResponseEntity<Applications> getApplicationById(@PathVariable Long id,@PathVariable String token) {
        Applications application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application with id " +id + " does not exist."));
        return ResponseEntity.ok(application);
    }

    // update application by id rest api
    @PutMapping("application/{id}{token}")
    public ResponseEntity<Applications> updateApplication(@PathVariable Long id, @RequestBody Applications applicationData,@PathVariable String token) {
       Applications application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("application with id " +id + " does not exist."));
        application.setName(applicationData.getName());
        application.setUsername(applicationData.getUsername());
        application.setStartDate(applicationData.getStartDate());
        application.setEndDate(applicationData.getEndDate());
        application.setReason(applicationData.getReason());
        application.setStatus(applicationData.getStatus());
        Applications updatedApplication = applicationRepository.save(application);
        LOGGER.info("Updated a new Application for user " + applicationData.getUsername());
        return ResponseEntity.ok(updatedApplication);
    }

    //delete application by id rest api
    @DeleteMapping("/application/{id}{token}")
    public ResponseEntity<Map<String, Boolean>> deleteApplication(@PathVariable Long id, @PathVariable String token){
        Applications application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application with id " +id + " does not exist."));
        LOGGER.info("Deleted an Application for user " +  application.getUsername());
        applicationRepository.delete(application);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
