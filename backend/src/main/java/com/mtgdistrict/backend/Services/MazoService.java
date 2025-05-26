package com.mtgdistrict.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.repositories.MazoRepository;

@Service
public class MazoService implements IMazoService {

    @Autowired
    private MazoRepository mazoRepository;

    @Override
    public List<Mazo> getAllMazos() {
        return (List<Mazo>) mazoRepository.findAll();
    }

    @Override
    public Mazo getMazoById(Long id) {
        return mazoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mazo not found with id: " + id));
    }

    @Override
    public Mazo createMazo(Mazo mazo) {
        // Validations can be added here before saving
        return mazoRepository.save(mazo);
    }

    @Override
    public Mazo updateMazo(Long id, Mazo mazo) {
        Mazo existingMazo = mazoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mazo not found with id: " + id));

        existingMazo.setNombreMazo(mazo.getNombreMazo());
        existingMazo.setDescripcionMazo(mazo.getDescripcionMazo());
        return mazoRepository.save(existingMazo);
    }

    @Override
    public void deleteMazo(Long id) {
        Mazo existingMazo = mazoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mazo not found with id: " + id));
        mazoRepository.delete(existingMazo);
    }

}
