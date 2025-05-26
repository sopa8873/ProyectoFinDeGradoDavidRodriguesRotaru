package com.mtgdistrict.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@IdClass(MazoCartaId.class)
public class MazoCarta {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_mazo")
    private Mazo mazo;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_carta")
    private Carta carta;

    @Column(nullable = false)
    private int cantidad;

    // Getters y Setters
}
