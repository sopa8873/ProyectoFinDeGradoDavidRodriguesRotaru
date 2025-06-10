package com.mtgdistrict.backend.services;

import com.mtgdistrict.backend.models.Coleccion;
import com.mtgdistrict.backend.repositories.ColeccionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColeccionService implements IColeccionService {

    @Autowired
    private ColeccionRepository coleccionRepository;

    @Override
    public List<Coleccion> getAllColecciones() {
        return coleccionRepository.findAll();
    }

    @Override
    public Coleccion getColeccionById(Long id) {
        Optional<Coleccion> coleccion = coleccionRepository.findById(id);
        return coleccion.orElse(null);
    }

    @Override
    public Coleccion createColeccion(Coleccion coleccion) {
        return coleccionRepository.save(coleccion);
    }

    @Override
    public Coleccion updateColeccion(Long id, Coleccion coleccion) {
        coleccion.setIdColeccion(id);
        return coleccionRepository.save(coleccion);
    }

    @Override
    public void deleteColeccion(Long id) {
        coleccionRepository.deleteById(id);
    }
}
