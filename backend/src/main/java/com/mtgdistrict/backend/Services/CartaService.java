package com.mtgdistrict.backend.services;

import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.repositories.CartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartaService implements ICartaService {

    @Autowired
    private CartaRepository cartaRepository;

    @Override
    public Optional<Carta> findByNombreCarta(String nombreCarta) {
        return cartaRepository.findByNombreCarta(nombreCarta);
    }

    @Override
    public void save(Carta carta) {
        cartaRepository.save(carta);
    }

    @Override
    public List<Carta> findAll() {
        return cartaRepository.findAll();
    }
}
