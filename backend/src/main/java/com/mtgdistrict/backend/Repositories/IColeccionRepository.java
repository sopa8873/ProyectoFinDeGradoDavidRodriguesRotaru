package com.mtgdistrict.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtgdistrict.backend.Models.Coleccion;


public interface IColeccionRepository extends JpaRepository<Coleccion, Long>{
}
