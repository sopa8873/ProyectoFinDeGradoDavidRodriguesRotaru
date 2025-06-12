package com.mtgdistrict.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.MazoCarta;
import com.mtgdistrict.backend.repositories.MazoCartaRepository;

@Service
public class MazoCartaService implements IMazoCartaService {

    @Autowired
    private MazoCartaRepository mazoCartaRepository;

    @Override
    public MazoCarta findByMazoAndCarta(Mazo mazo, Carta carta) {
        return mazoCartaRepository.findByMazoAndCarta(mazo, carta).orElse(null);
    }

    @Override
    public void save(MazoCarta mazoCarta) {
        mazoCartaRepository.save(mazoCarta);
    }
}
