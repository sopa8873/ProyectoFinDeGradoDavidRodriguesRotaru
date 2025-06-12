package com.mtgdistrict.backend.repositories;

import com.mtgdistrict.backend.models.Carta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartaRepository extends JpaRepository<Carta, Long> {
    Optional<Carta> findByNombreCarta(String nombreCarta);    @Query("SELECT c.idCarta FROM Carta c")
    List<Long> findAllIds();

    List<Carta> findByIdCartaIn(List<Long> ids);
}
