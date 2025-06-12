package com.mtgdistrict.backend.controllers;

import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.services.ICartaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/cartas")
public class CartaController {

    @Autowired
    private ICartaService cartaService;

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarOCrearCarta(@RequestParam String nombre) {
        // 1. Busca en tu base de datos
        Optional<Carta> carta = cartaService.findByNombreCarta(nombre);
        if (carta != null) {
            return ResponseEntity.ok(carta);
        }

        // 2. Si no existe, busca en Scryfall
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://api.scryfall.com/cards/named?fuzzy=" + URLEncoder.encode(nombre, StandardCharsets.UTF_8);
            @SuppressWarnings("unchecked")
            Map<String, Object> scryfallData = restTemplate.getForObject(url, Map.class);
            if (scryfallData == null) {
                return ResponseEntity.status(404).body("Carta no encontrada en Scryfall");
            }

            // 3. Crea y guarda la carta en tu base de datos (ajusta los campos según tu entidad)
            Carta nuevaCarta = new Carta();
            nuevaCarta.setNombreCarta((String) scryfallData.get("name"));
            nuevaCarta.setTipoCarta((String) scryfallData.get("type_line"));
            nuevaCarta.setTextoCarta((String) scryfallData.get("oracle_text"));
            Object coloresObj = scryfallData.get("colors");
            if (coloresObj instanceof java.util.List<?> coloresList) {
                nuevaCarta.setColorCarta(coloresList.stream().map(Object::toString).toList());
            } else {
                nuevaCarta.setColorCarta(new java.util.ArrayList<>());
            }
            nuevaCarta.setCosteManaCarta((String) scryfallData.get("mana_cost"));
            nuevaCarta.setCmc(scryfallData.get("cmc") != null ? ((Number) scryfallData.get("cmc")).intValue() : null);
            if (scryfallData.get("image_uris") instanceof Map imageUris) {
                nuevaCarta.setImagenUrlCarta((String) imageUris.get("normal"));
                nuevaCarta.setImagenArtCropCarta((String) imageUris.get("art_crop"));
            }
            nuevaCarta.setSetCarta((String) scryfallData.get("set_name"));
            nuevaCarta.setRarezaCarta((String) scryfallData.get("rarity"));

            cartaService.save(nuevaCarta);

            return ResponseEntity.ok(nuevaCarta);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Carta no encontrada en Scryfall");
        }
    }
}
