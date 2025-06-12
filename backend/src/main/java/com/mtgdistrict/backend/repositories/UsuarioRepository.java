package com.mtgdistrict.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mtgdistrict.backend.models.Usuario;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long >{
    Optional<Usuario> findByEmailUsuario(@Param("emailUsuario") String emailUsuario);
    Optional<Usuario> findByNombreUsuario(@Param("nombreUsuario") String emailUsuario);
}
