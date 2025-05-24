package com.mtgdistrict.backend.models;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Auth {
    private String username;
    private String password;
}

