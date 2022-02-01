package com.silvesterhasani.lufthansatestbackend.services;

import com.silvesterhasani.lufthansatestbackend.repository.UserRepository;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MyUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;

    public MyUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {

        String username = userRepository.findByUsername(s).getUsername();
        String password = userRepository.findByUsername(s).getPassword();

        return new User(username,password, new ArrayList<>());

    }


}