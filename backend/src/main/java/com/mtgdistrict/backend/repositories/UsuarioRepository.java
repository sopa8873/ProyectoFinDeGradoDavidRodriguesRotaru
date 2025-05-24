package com.mtgdistrict.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.mtgdistrict.backend.models.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long >{

}
