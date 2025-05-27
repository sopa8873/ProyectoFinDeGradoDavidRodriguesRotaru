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
@IdClass(MazoCartaId.class)
@Entity
public class MazoCarta {

    @Id
    @ManyToOne
    @JoinColumn(name = "id_mazo", referencedColumnName = "idMazo")  // referencia explícita a la PK
    private Mazo mazo;

    @Id
    @ManyToOne
    @JoinColumn(name = "id_carta", referencedColumnName = "idCarta")  // referencia explícita a la PK
    private Carta carta;

    @Column(nullable = false)
    private int cantidad;

    // getters y setters
}
