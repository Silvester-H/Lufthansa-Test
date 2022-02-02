package com.silvesterhasani.lufthansatestbackend.controller;


import com.silvesterhasani.lufthansatestbackend.exception.ResourceNotFoundException;
import com.silvesterhasani.lufthansatestbackend.model.User;
import com.silvesterhasani.lufthansatestbackend.model.UserVacationData;
import com.silvesterhasani.lufthansatestbackend.repository.UserRepository;
import com.silvesterhasani.lufthansatestbackend.repository.UserVacationDataRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class UserController {

    private final UserRepository userRepository;
    private final UserVacationDataRepository userVacationDataRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository,  PasswordEncoder passwordEncoder, UserVacationDataRepository userVacationDataRepository) {
        this.userRepository = userRepository;
        this.userVacationDataRepository = userVacationDataRepository;
        this.passwordEncoder = passwordEncoder;
    }

    //get all users
    @CrossOrigin
    @GetMapping("/users{token}")
    public List<User> getAllUsers(@PathVariable String token) {
        return userRepository.findAll();
    }

    // create users rest api
    @PostMapping("/users{token}")
    public User createUser(@RequestBody User user,@PathVariable String token) {
        UserVacationData NewVacation = new UserVacationData();
        NewVacation.setDays(40);
        userVacationDataRepository.save(NewVacation);
//            ADD LOG TO FILE
        return userRepository.save(user);
    }

    //get user by id rest api
    @GetMapping("/users/{id}{token}")
    public ResponseEntity<User> getUserById(@PathVariable Long id, @PathVariable String token) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " +id + " does not exist."));
        return ResponseEntity.ok(user);
    }

    // update user by id rest api
    @PutMapping("users/{id}{token}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userData,@PathVariable String token) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + id + " does not exist."));
        user.setUsername(userData.getUsername());
//      user.setPassword(passwordEncoder.encode(userData.getPassword()));
        user.setPassword(userData.getPassword());
        user.setStartDate(userData.getStartDate());
        user.setModified_at(userData.getModified_at());
        user.setModified_by(userData.getModified_by());
        user.setUser_type(userData.getUser_type());

        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    // update user by id rest api
    @PutMapping("users/passwords/{id}{token}")
    public ResponseEntity<User> updatePasswordUser(@PathVariable Long id, @RequestBody User userData,@PathVariable String token) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " +id + " does not exist."));
        user.setUsername(userData.getUsername());
        user.setModified_at(userData.getModified_at());
        user.setModified_by(userData.getModified_by());
        user.setUser_type(userData.getUser_type());
        user.setStartDate(userData.getStartDate());
        user.setPassword(passwordEncoder.encode(userData.getPassword()));
        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }

    // update user own password by username rest api
    @PutMapping("users/password/{username}{token}")
    public ResponseEntity<User> updateOwnPassword(@PathVariable String username, @RequestBody User userData,@PathVariable String token) {
        User user = userRepository.findByUsername(username);
        user.setPassword(passwordEncoder.encode(userData.getPassword()));
        user.setUsername(userData.getUsername());
//      user.setPassword(userData.getPassword());
        user.setModified_at(userData.getModified_at());
        user.setModified_by(userData.getModified_by());
        user.setStartDate(userData.getStartDate());
        User updatedUser = userRepository.save(user);

        return ResponseEntity.ok(updatedUser);
    }

    //delete user by id rest api
    @DeleteMapping("/users/{id}{token}")
    public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id, @PathVariable String token){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " +id + " does not exist."));

        UserVacationData userVac = userVacationDataRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " +id + " does not exist."));
        userRepository.delete(user);
        userVacationDataRepository.delete(userVac);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
