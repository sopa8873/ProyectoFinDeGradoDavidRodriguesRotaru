package com.mtgdistrict.mtgdistrict.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MazoCartaId{
    @Column(name = "IDMazo")
    private Integer idMazo;

    @Column(name = "IDCarta")
    private Integer idCarta;
}

