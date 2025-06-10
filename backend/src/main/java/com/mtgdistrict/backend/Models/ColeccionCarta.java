package com.mtgdistrict.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@IdClass(ColeccionCartaId.class)
public class ColeccionCarta {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_coleccion")
    @JsonBackReference("coleccion-cartas")
    private Coleccion coleccion;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_carta")
    @JsonBackReference("carta-coleccion")
    private Carta carta;

    @Column(nullable = false)
    private int cantidad;

    // Getters y Setters
}
