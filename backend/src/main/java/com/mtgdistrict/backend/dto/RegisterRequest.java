package com.mtgdistrict.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String nombreUsuario;
    private String emailUsuario;
    private String passwordUsuario;
}
