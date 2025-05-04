package com.mtgdistrict.mtgdistrict.Models;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "MazoCarta")
public class MazoCarta {

    @EmbeddedId
    private MazoCartaId id;

    @ManyToOne
    @MapsId("idMazo")
    @JoinColumn(name = "IDMazo")
    private Mazo mazo;

    @ManyToOne
    @MapsId("idCarta")
    @JoinColumn(name = "IDCarta")
    private Carta carta;

    @Column(name = "Cantidad", nullable = false)
    private Integer cantidad;
}