package com.mtgdistrict.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain fitlerChain(HttpSecurity http) throws Exception {
        
        http.authorizeHttpRequests(request->
            request.requestMatchers("/api/usuarios/**")
                .permitAll()
                .anyRequest()
                .authenticated()
        )
        .csrf(csrf -> csrf.disable());
        return http.build();
    }
}
