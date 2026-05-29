package com.rishab.taskmanager.config;

import com.rishab.taskmanager.security.JwtAuthFilter;
import com.rishab.taskmanager.service.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsServiceImpl userDetailsService;

    // ─── 1. Define which routes are public and which are protected ──
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Disable CSRF - not needed for REST APIs using JWT
            .csrf(csrf -> csrf.disable())

            // Define route permissions
            .authorizeHttpRequests(auth -> auth
                // These routes are PUBLIC - no token needed
                .requestMatchers("/api/auth/**").permitAll()
                // Everything else requires a valid token
                .anyRequest().authenticated()
            )

            // Use STATELESS sessions - no server side sessions
            // Every request must carry its own JWT token
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // Register our authentication provider
            .authenticationProvider(authenticationProvider())

            // Add our JwtAuthFilter BEFORE Spring's default login filter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // ─── 2. Password encoder - BCrypt hashing ───────────────────────
    // BCrypt automatically salts and hashes passwords
    // NEVER store plain text passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ─── 3. Authentication provider ─────────────────────────────────
    // Connects UserDetailsService + PasswordEncoder together
    // Spring uses this to verify username and password during login
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);  // how to find the user
        provider.setPasswordEncoder(passwordEncoder());       // how to verify password
        return provider;
    }

    // ─── 4. Authentication manager ──────────────────────────────────
    // Used in AuthService to trigger the login verification process
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

}
