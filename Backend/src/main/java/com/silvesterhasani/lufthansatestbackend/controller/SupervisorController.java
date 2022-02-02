package com.silvesterhasani.lufthansatestbackend.controller;


import com.silvesterhasani.lufthansatestbackend.exception.ResourceNotFoundException;
import com.silvesterhasani.lufthansatestbackend.model.Applications;
import com.silvesterhasani.lufthansatestbackend.model.UserVacationData;
import com.silvesterhasani.lufthansatestbackend.repository.ApplicationRepository;
import com.silvesterhasani.lufthansatestbackend.repository.UserRepository;
import com.silvesterhasani.lufthansatestbackend.repository.UserVacationDataRepository;
import com.silvesterhasani.lufthansatestbackend.services.WorkDaysFinder;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class SupervisorController {

    private final JavaMailSender javaMailSender;
    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;
    private final UserVacationDataRepository userVacationDataRepository;

    public SupervisorController(UserRepository userRepository, ApplicationRepository applicationRepository, UserVacationDataRepository userVacationDataRepository, JavaMailSender javaMailSender) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;
        this.userVacationDataRepository = userVacationDataRepository;
        this.javaMailSender = javaMailSender;
    }

    //get all applications
    @GetMapping("/supervisors{token}")
    public List<Applications> getAllApplications(@PathVariable String token){
        return applicationRepository.findAll();
    }

    //get application by id rest api
    @GetMapping("/supervisors/{id}{token}")
    public ResponseEntity<Applications> getApplicationById(@PathVariable Long id, @PathVariable String token) {
        Applications application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application with id " +id + " does not exist."));
        return ResponseEntity.ok(application);
    }

    // update application by id rest api
    @PutMapping("supervisors/{id}{token}")
    public ResponseEntity<Applications> updateApplication(@PathVariable Long id, @RequestBody Applications applicationData,@PathVariable String token) {
        Applications application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("application with id " +id + " does not exist."));
            long idUser = userRepository.findByUsername(applicationData.getUsername()).getId();

            long noDays =  userVacationDataRepository.findById(idUser).get().getDays();
            int Workdays = WorkDaysFinder.getWorkingDaysBetweenTwoDates(applicationData.getStartDate(), applicationData.getEndDate());
            long newDays = noDays - Workdays;
            UserVacationData userVac = userVacationDataRepository.findById(idUser)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " +id + " does not exist."));
            userVac.setDays(newDays);
            userVacationDataRepository.save(userVac);
            application.setName(applicationData.getName());
            application.setUsername(applicationData.getUsername());
            application.setStartDate(applicationData.getStartDate());
            application.setEndDate(applicationData.getEndDate());
            application.setReason(applicationData.getReason());
            application.setStatus(applicationData.getStatus());
            if(applicationData.getStatus()=="Accepted" ) {
                SimpleMailMessage msg = new SimpleMailMessage();
                msg.setTo(applicationData.getUsername()+"@gmail.com");
                msg.setSubject("Application Accepted");
                msg.setText("Your Vacation has been accepted");
                javaMailSender.send(msg);
            }
            if(applicationData.getStatus()=="Denied" ) {
                SimpleMailMessage msg = new SimpleMailMessage();
                msg.setTo(applicationData.getUsername()+"@gmail.com");
                msg.setSubject("Application Denied");
                msg.setText("Your Vacation has been denied");
                javaMailSender.send(msg);
            }
            Applications updatedApplication = applicationRepository.save(application);
            return ResponseEntity.ok(updatedApplication);



    }

    @GetMapping("/supervisorsVacations/{id}{token}")
    public Long getVacationUser(@PathVariable Long id,@PathVariable String token){
        Applications application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("application with id " +id + " does not exist."));

        String username = application.getUsername();
        long idVac =  userRepository.findByUsername(username).getId();
        long VacationData = userVacationDataRepository.findById(idVac).get().getDays();
        return VacationData;
    }
}
