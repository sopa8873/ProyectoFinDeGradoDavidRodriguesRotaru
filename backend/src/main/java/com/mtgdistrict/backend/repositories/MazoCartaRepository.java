package com.mtgdistrict.backend.repositories;

import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.models.MazoCarta;
import com.mtgdistrict.backend.models.MazoCartaId;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MazoCartaRepository extends JpaRepository<MazoCarta, MazoCartaId> {
    Optional<MazoCarta> findByMazoAndCarta(Mazo mazo, Carta carta);
}
