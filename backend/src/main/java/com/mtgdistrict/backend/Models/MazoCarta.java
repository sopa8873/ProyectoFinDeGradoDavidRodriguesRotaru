package com.mtgdistrict.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@IdClass(MazoCartaId.class)
@Entity
public class MazoCarta {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_mazo")
    @JsonBackReference("mazo-cartas")
    private Mazo mazo;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_carta")
    @JsonBackReference("carta-mazo")
    private Carta carta;

    @Column(nullable = false)
    private int cantidad;

    // getters y setters
}
