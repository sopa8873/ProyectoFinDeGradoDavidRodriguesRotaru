package com.mtgdistrict.backend.services;

import java.util.List;

import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.Usuario;


public interface IMazoService {

    List<Mazo> getAllMazos();
    
    Mazo getMazoById(Long id);

    Mazo createMazo(Mazo mazo);

    Mazo updateMazo(Long id, Mazo mazo);

    void deleteMazo(Long id);
    
    List<Mazo> getMazosByUsuario(Usuario usuario);
}
