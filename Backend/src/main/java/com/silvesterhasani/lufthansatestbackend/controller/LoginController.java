package com.silvesterhasani.lufthansatestbackend.controller;


import com.silvesterhasani.lufthansatestbackend.model.AuthenticationRequest;
import com.silvesterhasani.lufthansatestbackend.model.AuthenticationResponse;
import com.silvesterhasani.lufthansatestbackend.repository.UserRepository;
import com.silvesterhasani.lufthansatestbackend.services.JwtUtil;
import com.silvesterhasani.lufthansatestbackend.services.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class LoginController {


    private final AuthenticationProvider authenticationProvider;
    private final MyUserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtTokenUtil;

    public LoginController(AuthenticationProvider authenticationProvider, MyUserDetailsService userDetailsService, UserRepository userRepository, JwtUtil jwtTokenUtil) {
        this.authenticationProvider = authenticationProvider;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.jwtTokenUtil = jwtTokenUtil;
    }


    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        try {


            authenticationProvider.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect credentials", e);
        }
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwt = jwtTokenUtil.generateToken(userDetails);
        final String user_type = userRepository
                .findByUsername(authenticationRequest.getUsername()).getUser_type();

        return ResponseEntity.ok(new AuthenticationResponse(jwt,user_type));

    }
}
