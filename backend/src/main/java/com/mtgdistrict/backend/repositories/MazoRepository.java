package com.mtgdistrict.backend.repositories;

import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MazoRepository extends JpaRepository<Mazo, Long> {
    List<Mazo> findByUsuario(Usuario usuario);
}
