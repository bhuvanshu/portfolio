package com.bhuvanshu.portfolio_backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    // Set FRONTEND_ORIGIN env var to your deployed frontend URL in production.
    // Locally it defaults to the Live Server port.
    @Value("${frontend.origin:http://127.0.0.1:5500}")
    private String frontendOrigin;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(frontendOrigin)
                        .allowedMethods("GET", "POST", "DELETE", "OPTIONS")
                        .allowedHeaders("Content-Type", "X-ADMIN-KEY")
                        .maxAge(3600);
            }
        };
    }
}
