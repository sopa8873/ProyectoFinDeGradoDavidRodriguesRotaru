package com.mtgdistrict.backend.models;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarta;

    @Column(nullable = false, unique = true)
    private String nombreCarta;

    @Column(nullable = false)
    private String colorCarta;

    @Column(nullable = false)
    private int costeManaCarta;

    @Column(nullable = false)
    private String imagenUrlCarta;

    @OneToMany(mappedBy = "carta", cascade = CascadeType.ALL)
    private List<MazoCarta> mazos;

    @OneToMany(mappedBy = "carta", cascade = CascadeType.ALL)
    private List<ColeccionCarta> colecciones;

    // Getters y Setters
}

