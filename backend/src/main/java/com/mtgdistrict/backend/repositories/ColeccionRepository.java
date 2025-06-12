package com.mtgdistrict.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mtgdistrict.backend.models.Coleccion;
import com.mtgdistrict.backend.models.Usuario;

import java.util.List;

@Repository
public interface ColeccionRepository extends JpaRepository<Coleccion, Long> {
    List<Coleccion> findByUsuario(Usuario usuario);
}
