package com.mtgdistrict.backend.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.repositories.CartaRepository;

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
}
