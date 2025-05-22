package com.mtgdistrict.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtgdistrict.backend.Models.Carta;


public interface ICartaRepository extends JpaRepository<Carta, Long>{
}
