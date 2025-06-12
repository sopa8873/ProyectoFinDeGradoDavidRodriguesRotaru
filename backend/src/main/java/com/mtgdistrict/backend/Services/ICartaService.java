package com.mtgdistrict.backend.services;

import com.mtgdistrict.backend.models.Carta;

import java.util.List;
import java.util.Optional;

public interface ICartaService {
    Optional<Carta> findByNombreCarta(String nombreCarta);
    void save(Carta carta);
    // Otros métodos si los necesitas...
    Object findAll();
    /**
     * Obtiene una lista de cartas aleatorias de forma eficiente (no usa SQL RAND()).
     */
    List<Carta> findRandomCartas(int cantidad);
}
