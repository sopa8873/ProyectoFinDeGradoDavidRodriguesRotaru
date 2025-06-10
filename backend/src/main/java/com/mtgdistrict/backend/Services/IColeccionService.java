package com.mtgdistrict.backend.services;

import com.mtgdistrict.backend.models.Coleccion;
import java.util.List;

public interface IColeccionService {
    List<Coleccion> getAllColecciones();
    Coleccion getColeccionById(Long id);
    Coleccion createColeccion(Coleccion coleccion);
    Coleccion updateColeccion(Long id, Coleccion coleccion);
    void deleteColeccion(Long id);
}
