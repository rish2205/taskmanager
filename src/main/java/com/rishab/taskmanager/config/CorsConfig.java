package com.rishab.taskmanager.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        CorsConfiguration config = new CorsConfiguration();

        // ─── Who is allowed to call our backend ───────────────────
        // During development React runs on localhost:3000
        // During production replace with your actual deployed URL
        config.setAllowedOrigins(List.of(
                "http://localhost:3000",    // React dev server
                "http://localhost:5173"     // Vite dev server (alternative)
        ));

        // ─── Which HTTP methods are allowed ───────────────────────
        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "OPTIONS"    // browser sends OPTIONS first to check CORS
        ));

        // ─── Which headers are allowed in requests ────────────────
        config.setAllowedHeaders(List.of(
                "Authorization",     // for our JWT token
                "Content-Type",      // for JSON body
                "Accept"
        ));

        // ─── Allow Authorization header in responses ──────────────
        config.setExposedHeaders(List.of("Authorization"));

        // ─── Allow cookies and auth headers ───────────────────────
        config.setAllowCredentials(true);

        // ─── Apply this config to ALL routes ──────────────────────
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }

}

