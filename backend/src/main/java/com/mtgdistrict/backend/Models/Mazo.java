package com.mtgdistrict.backend.models;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
public class Mazo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMazo;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnoreProperties({"mazos", "passwordUsuario", "emailUsuario"}) // Oculta solo lo que no quieres mostrar
    private Usuario usuario;

    @Column(nullable = false)
    private String nombreMazo;

    private String descripcionMazo;

    @Column(name = "comandante_mazo")
    private String comandanteMazo; // o Long si prefieres, según tu modelo de carta

    @Column(nullable = false)
    private String formatoMazo;

    @Column(nullable = false, insertable = false, updatable = false)
    private Timestamp fechaCreacionMazo;

    @Column(nullable = false)
    private boolean visibilidadMazo;

    @Column(nullable = false)
    private int votacionesPositivasMazo;

    @OneToMany(mappedBy = "mazo", cascade = CascadeType.ALL)
    @JsonManagedReference("mazo-cartas")
    private List<MazoCarta> cartas;

    // Getters y Setters
}

