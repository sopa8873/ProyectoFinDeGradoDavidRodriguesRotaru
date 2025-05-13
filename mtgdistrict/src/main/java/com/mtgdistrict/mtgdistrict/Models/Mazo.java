package com.mtgdistrict.mtgdistrict.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mazo{
    @Id
    @Column(name = "IDMazo")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IDUsuario", nullable = false)
    private Usuario usuario;

    @Column(name = "DescripcionMazo")
    private String descripcionMazo;

    @Column(name = "FormatoMazo", nullable = false)
    private String formatoMazo;

    @Column(name = "FechaCreacionMazo")
    private String fechaCreacionMazo;

    @Column(name = "VisibilidadMazo", nullable = false)
    private Boolean visiblidadMazo;

    @Column(name = "VotacionesPositivasMazo", nullable = false)
    private Integer votacionesPositivasMazo;
}
