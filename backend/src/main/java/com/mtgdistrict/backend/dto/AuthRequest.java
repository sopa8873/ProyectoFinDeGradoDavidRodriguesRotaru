package com.mtgdistrict.backend.dto;

import lombok.Getter;
import lombok.Setter;

// DTO para login
@Getter
@Setter
public class AuthRequest {
    private String username;
    private String password;
    // getters y setters
}

