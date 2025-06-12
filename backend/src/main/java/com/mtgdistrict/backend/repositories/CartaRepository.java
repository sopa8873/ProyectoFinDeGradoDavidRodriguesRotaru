package com.mtgdistrict.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtgdistrict.backend.models.Carta;

@Repository
public interface CartaRepository extends JpaRepository<Carta, Long >{
	Optional<Carta> findByNombreCarta(String nombreCarta);
}
