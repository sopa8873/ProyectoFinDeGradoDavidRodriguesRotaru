package com.mtgdistrict.backend.models;
import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Coleccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idColeccion;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonBackReference("usuario-coleccion")
    private Usuario usuario;

    @Column(nullable = false)
    private String nombreColeccion;

    @Column(nullable = false)
    private String descripcionColeccion;

    @Column(nullable = false)
    private Timestamp fechaCreacionColeccion = new Timestamp(System.currentTimeMillis());

    @OneToMany(mappedBy = "coleccion", cascade = CascadeType.ALL)
    @JsonManagedReference("coleccion-cartas")
    private List<ColeccionCarta> cartas;

    // Getters y Setters
}

