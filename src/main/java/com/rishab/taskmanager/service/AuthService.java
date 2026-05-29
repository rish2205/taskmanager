package com.rishab.taskmanager.service;

import com.rishab.taskmanager.dto.AuthResponse;
import com.rishab.taskmanager.dto.LoginRequest;
import com.rishab.taskmanager.dto.RegisterRequest;
import com.rishab.taskmanager.Entity.User;
import com.rishab.taskmanager.repository.UserRepository;
import com.rishab.taskmanager.security.JwtUtil;

import com.rishab.taskmanager.exception.EmailAlreadyExistsException;
import com.rishab.taskmanager.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    // ─── REGISTER ────────────────────────────────────────────────────
    public AuthResponse register(RegisterRequest request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email already registered");
        }

        // Create new user
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Store encrypted password
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Save user
        userRepository.save(user);

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail());

        // Return response
        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail()
        );
    }

    // ─── LOGIN ───────────────────────────────────────────────────────
    public AuthResponse login(LoginRequest request) {

        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // Fetch user from DB
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new UserNotFoundException("User not found")
                );

        // Generate token
        String token = jwtUtil.generateToken(user.getEmail());

        // Return response
        return new AuthResponse(
                token,
                user.getName(),
                user.getEmail()
        );
    }
}

