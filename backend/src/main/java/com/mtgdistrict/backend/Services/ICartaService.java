package com.mtgdistrict.backend.services;

import java.util.Optional;

import com.mtgdistrict.backend.models.Carta;

public interface ICartaService {
    Optional<Carta> findByNombreCarta(String nombre);
    void save(Carta carta);
}
