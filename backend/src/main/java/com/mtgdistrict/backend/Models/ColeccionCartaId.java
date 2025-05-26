package com.mtgdistrict.backend.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class ColeccionCartaId implements Serializable {
    private Long coleccion;
    private Long carta;

    // equals() y hashCode()
}
