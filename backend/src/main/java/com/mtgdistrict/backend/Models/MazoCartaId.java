package com.mtgdistrict.backend.models;

import java.io.Serializable;

import lombok.Data;

@Data
public class MazoCartaId implements Serializable {
    private Long mazo;
    private Long carta;
    // equals() y hashCode()
}
