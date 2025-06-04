package com.mtgdistrict.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private final String jwtSecret = "cambia_esto_por_una_clave_secreta_de_al_menos_32_bytes_1234";

    public String generateToken(String username) {
        long now = System.currentTimeMillis();
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", username);
        claims.put("iat", new Date(now));
        claims.put("exp", new Date(now + 86400000)); // 1 día

        return Jwts.builder()
            .claims(claims)
            .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
            .compact();
    }

    public String extractUsername(String token) {
        Claims claims = Jwts.parserBuilder()
            .setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
            .build()
            .parseClaimsJws(token)
            .getBody();
        return claims.get("sub", String.class);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()));
    }
}
