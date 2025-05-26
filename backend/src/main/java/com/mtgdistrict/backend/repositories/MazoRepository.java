package com.mtgdistrict.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtgdistrict.backend.models.Mazo;

@Repository
public interface MazoRepository extends JpaRepository<Mazo, Long >{
}
