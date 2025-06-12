package com.mtgdistrict.backend.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DatosPublicosUsuario {

    private String nombreUsuario;
    private String avatarUsuario;
    private List<?> mazos;
    
}
