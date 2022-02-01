package com.silvesterhasani.lufthansatestbackend.controller;

import com.silvesterhasani.lufthansatestbackend.model.Applications;
import com.silvesterhasani.lufthansatestbackend.repository.ApplicationRepository;
import com.silvesterhasani.lufthansatestbackend.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1/")
public class ApplicationController {

    private final UserRepository userRepository;
    private final ApplicationRepository applicationRepository;

    public ApplicationController(UserRepository userRepository, ApplicationRepository applicationRepository) {
        this.userRepository = userRepository;
        this.applicationRepository = applicationRepository;

    }

    //get all applications for User
    @GetMapping("/application{token}")
    public Applications getAllApplications(@PathVariable String token) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        String username = userDetails.getUsername();
        return  applicationRepository.findByUsername(username);
    }

    // create application rest api
    @PostMapping("/application{token}")
    public Applications createApplication(@RequestBody Applications application,@PathVariable String token) {

        return applicationRepository.save(application);
    }
//
//    //get application by id rest api
//    @GetMapping("/applications/{id}{token}")
//    public ResponseEntity<Application> getApplicationById(@PathVariable Long id,@PathVariable String token) {
//        Application application = applicationRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Application with id " +id + " does not exist."));
//        return ResponseEntity.ok(application);
//    }
//
//    // update application by id rest api
//    @PutMapping("applications/{id}{token}")
//    public ResponseEntity<Application> updateApplication(@PathVariable Long id, @RequestBody ApplicationData,@PathVariable String token) {
//       Application application = applicationRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("application with id " +id + " does not exist."));
//        application.setName(applicationData.getName());
//        application.setSurname(applicationData.getSurname());
//        application.setEmail(applicationData.getEmail());
//        application.setId_card(applicationData.getId_card());
//        application.setLand_area(applicationData.getLand_area());
//        application.setModified_at(applicationData.getModified_at());
//        application.setModified_by(applicationData.getModified_by());
//        application.setStatus(applicationData.getStatus());
//        Application updatedApplication = applicationRepository.save(application);
//
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
//        LocalDateTime now = LocalDateTime.now();
//        Report report = new Report();
//        report.setUser(application.getModified_by());
//        report.setAction("Updated application with id: " + id);
//        report.setTime(dtf.format(now));
//        reportRepository.save(report);
//        return ResponseEntity.ok(updatedApplication);
//    }
//
//    //delete application by id rest api
//    @DeleteMapping("/applications/{id}{token}")
//    public ResponseEntity<Map<String, Boolean>> deleteApplication(@PathVariable Long id,@PathVariable String token){
//        Application application = applicationRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Application with id " +id + " does not exist."));
//        applicationRepository.delete(application);
//
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
//        LocalDateTime now = LocalDateTime.now();
//        Report report = new Report();
//        report.setUser(application.getModified_by());
//        report.setAction("Deleted Application with id: " + id);
//        report.setTime(dtf.format(now));
//        reportRepository.save(report);
//        Map<String,Boolean> response = new HashMap<>();
//        response.put("deleted", Boolean.TRUE);
//        return ResponseEntity.ok(response);
//    }
}
