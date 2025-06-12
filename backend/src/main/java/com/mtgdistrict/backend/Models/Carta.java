package com.mtgdistrict.backend.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCarta;

    @Column(nullable = false, unique = true)
    private String nombreCarta; // Scryfall: "name"

    @Column
    private String tipoCarta; // Scryfall: "type_line"

    @Column
    private String textoCarta; // Scryfall: "oracle_text"

    @ElementCollection
    @CollectionTable(name = "carta_color", joinColumns = @JoinColumn(name = "id_carta"))
    @Column(name = "color")
    private List<String> colorCarta = new ArrayList<>(); // Scryfall: "colors" (puedes guardar como string: "['R','G']" o como JSON/texto)

    @Column
    private String costeManaCarta; // Scryfall: "mana_cost" (ej: "{1}{G}{G}")

    @Column
    private Integer cmc; // Scryfall: "cmc" (coste convertido de maná)

    @Column
    private String imagenUrlCarta; // Scryfall: image_uris.normal

    @Column
    private String imagenArtCropCarta; // Scryfall: image_uris.art_crop

    @Column
    private String setCarta; // Scryfall: "set_name"

    @Column
    private String rarezaCarta; // Scryfall: "rarity"

    // Puedes añadir más campos según lo que uses en tu app

    @OneToMany(mappedBy = "carta")
    @JsonManagedReference("carta-mazo")
    private List<MazoCarta> mazos;
}

