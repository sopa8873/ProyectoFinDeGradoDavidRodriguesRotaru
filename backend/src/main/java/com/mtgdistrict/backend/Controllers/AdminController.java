package com.mtgdistrict.backend.controllers;

import com.mtgdistrict.backend.components.BulkScryfallToDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private BulkScryfallToDB bulkScryfallToDB;

    @PostMapping("/importarCartas")
    public String importarCartas() throws Exception {
        bulkScryfallToDB.importarCartas();
        return "Importación lanzada";
    }
}
