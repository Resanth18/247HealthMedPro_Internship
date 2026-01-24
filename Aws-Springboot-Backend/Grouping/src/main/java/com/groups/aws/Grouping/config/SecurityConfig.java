package com.groups.aws.Grouping.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                // Disable CSRF (API usage)
                .csrf(csrf -> csrf.disable())

                // VERY IMPORTANT: disable oauth2 for auth APIs
                .oauth2ResourceServer(oauth2 -> oauth2.disable())

                .authorizeHttpRequests(auth -> auth
                        // ✅ Auth APIs MUST be FIRST
                        .requestMatchers(
                                "/auth/login",
                                "/auth/forgot-password",
                                "/auth/reset-password",
                                "/auth/set-new-password",
                                "/auth/confirm-new-password"
                        ).permitAll()


                        // 🔒 Everything else needs token
                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
