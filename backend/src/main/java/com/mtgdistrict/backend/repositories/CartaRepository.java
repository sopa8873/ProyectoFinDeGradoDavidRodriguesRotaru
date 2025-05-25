package com.mtgdistrict.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mtgdistrict.backend.models.Carta;

@Repository
public interface CartaRepository extends JpaRepository<Carta, Long >{
}
