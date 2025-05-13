package com.mtgdistrict.mtgdistrict.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Carta")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Carta{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDCarta")
    private Long id;

    @Column(name = "NombreCarta", nullable = false, unique = true)
    private String nombreCarta;

    @Column(name = "ColorCarta", nullable = false)
    private String colorCarta;

    @Column(name = "CosteManaCarta", nullable = false)
    private Integer costeManaCarta;

    @Column(name = "ImagenUrlCarta", nullable = false)
    private String imagenUrlCarta;
}

