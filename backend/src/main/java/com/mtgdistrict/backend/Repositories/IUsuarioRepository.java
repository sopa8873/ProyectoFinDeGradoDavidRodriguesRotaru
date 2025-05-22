package com.mtgdistrict.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mtgdistrict.backend.Models.Usuario;

public interface IUsuarioRepository extends JpaRepository<Usuario, Long>{
}
