package com.mtgdistrict.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtgdistrict.backend.Models.Mazo;


public interface IMazoRepository extends JpaRepository<Mazo, Long>{
}
