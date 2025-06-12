package com.mtgdistrict.backend.services;

import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.MazoCarta;

public interface IMazoCartaService {
    MazoCarta findByMazoAndCarta(Mazo mazo, Carta carta);
    void save(MazoCarta mazoCarta);
}
