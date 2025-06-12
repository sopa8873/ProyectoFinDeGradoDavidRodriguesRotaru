package com.mtgdistrict.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private final String jwtSecret = "a-string-secret-at-least-256-bits-long";

    public String generateToken(String email) {
        long now = System.currentTimeMillis();
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", email);
        claims.put("iat", new Date(now));
        claims.put("exp", new Date(now + 86400000)); // 1 día

        return Jwts.builder()
            .claims(claims)
            .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
            .compact();
    }

    public String extractEmail(String token) {
        Claims claims = Jwts.parser()
            .verifyWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
            .build()
            .parseSignedClaims(token)
            .getPayload();
        return claims.get("sub", String.class);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()));
    }
}
