package com.mtgdistrict.backend.repositories;

import com.mtgdistrict.backend.models.Carta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartaRepository extends JpaRepository<Carta, Long> {
    Optional<Carta> findByNombreCarta(String nombreCarta);

    @Query(value = "SELECT * FROM carta ORDER BY RAND() LIMIT :cantidad", nativeQuery = true)
    List<Carta> findRandomCartas(@Param("cantidad") int cantidad);
}
