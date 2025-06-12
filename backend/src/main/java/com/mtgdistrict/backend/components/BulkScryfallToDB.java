package com.mtgdistrict.backend.components;

import com.fasterxml.jackson.databind.*;
import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.repositories.CartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.*;
import java.net.URI;
import java.nio.file.*;
import java.util.*;

@Component
public class BulkScryfallToDB {

    @Autowired
    private CartaRepository cartaRepository;

    private static final String BULK_URL = "https://api.scryfall.com/bulk-data/922288cb-4bef-45e1-bb30-0c2bd3d3534f";
    private static final String FILE_NAME = "default-cards.json";

    public void importarCartas() throws Exception {
        // Descarga el archivo si no existe
        if (!Files.exists(Paths.get(FILE_NAME))) {
            System.out.println("Descargando bulk de Scryfall...");
            String downloadUrl = getDownloadUrl();
            try (InputStream in = URI.create(downloadUrl).toURL().openStream()) {
                Files.copy(in, Paths.get(FILE_NAME), StandardCopyOption.REPLACE_EXISTING);
            }
            System.out.println("Descarga completada.");
        }

        ObjectMapper mapper = new ObjectMapper();
        try (InputStream input = new FileInputStream(FILE_NAME)) {
            MappingIterator<Map<String, Object>> it = mapper.readerFor(Map.class).readValues(input);
            int count = 0;
            while (it.hasNext() && count < 1000) {
                Map<String, Object> carta = it.next();
                if (!"es".equals(carta.get("lang"))) continue;

                String nombre = carta.get("printed_name") != null ? (String) carta.get("printed_name") : (String) carta.get("name");
                String tipo = carta.get("printed_type_line") != null ? (String) carta.get("printed_type_line") : (String) carta.get("type_line");
                String texto = carta.get("printed_text") != null ? (String) carta.get("printed_text") : (String) carta.get("oracle_text");
                @SuppressWarnings("unchecked")
                List<String> colores = (List<String>) carta.get("colors");
                String costeMana = (String) carta.get("mana_cost");
                Integer cmc = carta.get("cmc") != null ? ((Number) carta.get("cmc")).intValue() : null;
                @SuppressWarnings("unchecked")
                Map<String, String> imageUris = (Map<String, String>) carta.get("image_uris");
                String imagenNormal = imageUris != null ? imageUris.get("normal") : null;
                String imagenArtCrop = imageUris != null ? imageUris.get("art_crop") : null;
                String set = (String) carta.get("set_name");
                String rareza = (String) carta.get("rarity");

                if (cartaRepository.findByNombreCarta(nombre).isPresent()) {
                    continue; // Ya existe, no la insertes
                }

                Carta nuevaCarta = new Carta();
                nuevaCarta.setNombreCarta(nombre);
                nuevaCarta.setTipoCarta(tipo);
                nuevaCarta.setTextoCarta(texto);
                nuevaCarta.setColorCarta(colores != null ? colores : new ArrayList<>());
                nuevaCarta.setCosteManaCarta(costeMana);
                nuevaCarta.setCmc(cmc);
                nuevaCarta.setImagenUrlCarta(imagenNormal);
                nuevaCarta.setImagenArtCropCarta(imagenArtCrop);
                nuevaCarta.setSetCarta(set);
                nuevaCarta.setRarezaCarta(rareza);

                cartaRepository.save(nuevaCarta);

                if (++count % 1000 == 0) System.out.println(count + " cartas guardadas...");
            }
            System.out.println("Importación completada. Total cartas en español: " + count);
        }
    }

    // Obtiene la URL real de descarga desde el endpoint bulk-data
    private String getDownloadUrl() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        @SuppressWarnings("unchecked")
        Map<String, Object> data = mapper.readValue(URI.create(BULK_URL).toURL(), Map.class);
        return (String) data.get("download_uri");
    }
}