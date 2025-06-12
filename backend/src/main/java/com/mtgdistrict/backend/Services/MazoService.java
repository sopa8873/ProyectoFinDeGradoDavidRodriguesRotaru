package com.mtgdistrict.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.Usuario;
import com.mtgdistrict.backend.repositories.MazoRepository;
import com.mtgdistrict.backend.repositories.CartaRepository;

@Service
public class MazoService implements IMazoService {

    @Autowired
    private MazoRepository mazoRepository;    @Autowired
    private CartaRepository cartaRepository;

    @Override
    public List<Mazo> getAllMazos() {
        return (List<Mazo>) mazoRepository.findAll();
    }

    @Override
    public Mazo getMazoById(Long id) {
        return mazoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mazo not found with id: " + id));
    }    @Override
    public Mazo createMazo(Mazo mazo) {
        if (mazo.getComandanteMazo() != null && mazo.getComandanteMazo().getNombreCarta() != null) {
            Carta comandante = cartaRepository.findByNombreCarta(mazo.getComandanteMazo().getNombreCarta())
                .orElse(null);
            mazo.setComandanteMazo(comandante);
        }
        return mazoRepository.save(mazo);
    }

    @Override
    public Mazo updateMazo(Long id, Mazo mazo) {
        Mazo existingMazo = mazoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mazo not found with id: " + id));

        existingMazo.setNombreMazo(mazo.getNombreMazo());
        existingMazo.setDescripcionMazo(mazo.getDescripcionMazo());        existingMazo.setFormatoMazo(mazo.getFormatoMazo());
        existingMazo.setComandanteMazo(mazo.getComandanteMazo());
        existingMazo.setVisibilidadMazo(mazo.isVisibilidadMazo());

        return mazoRepository.save(existingMazo);
    }

    @Override
    public void deleteMazo(Long id) {
        Mazo existingMazo = mazoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mazo not found with id: " + id));
        mazoRepository.delete(existingMazo);
    }

    @Override
    public List<Mazo> getMazosByUsuario(Usuario usuario) {
        return mazoRepository.findByUsuario(usuario);
    }

}
