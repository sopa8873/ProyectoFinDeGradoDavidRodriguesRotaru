package com.mtgdistrict.backend.services;

import java.util.List;

import com.mtgdistrict.backend.models.Mazo;


public interface IMazoService {

    // Obtener todos los mazos
    List<Mazo> getAllMazos();
    
    // Obtener un mazo por su ID
    Mazo getMazoById(Long id);

    // Crear un nuevo mazo
    Mazo createMazo(Mazo mazo);

    // Actualizar un mazo existente
    Mazo updateMazo(Long id, Mazo mazo);

    // Eliminar un mazo por su ID
    void deleteMazo(Long id);
}
