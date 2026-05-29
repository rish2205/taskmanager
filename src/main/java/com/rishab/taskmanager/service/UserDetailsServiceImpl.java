package com.rishab.taskmanager.service;

import com.rishab.taskmanager.Entity.User;
import com.rishab.taskmanager.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // 1. Find user in database by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        // 2. Wrap our User entity into Spring Security's UserDetails format
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),                                    // username (we use email)
                user.getPassword(),                                 // hashed password
                List.of(new SimpleGrantedAuthority("ROLE_USER"))   // roles/permissions
        );
    }

}