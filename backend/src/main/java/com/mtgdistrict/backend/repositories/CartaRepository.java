package com.mtgdistrict.backend.repositories;

import com.mtgdistrict.backend.models.Carta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartaRepository extends JpaRepository<Carta, Long> {
    Optional<Carta> findByNombreCarta(String nombreCarta);
}
