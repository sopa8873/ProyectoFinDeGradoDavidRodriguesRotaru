package com.mtgdistrict.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mtgdistrict.backend.models.Carta;
import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.MazoCarta;
import com.mtgdistrict.backend.services.ICartaService;
import com.mtgdistrict.backend.services.IMazoCartaService;
import com.mtgdistrict.backend.services.IMazoService;
import com.mtgdistrict.backend.services.IUsuarioService;

import org.springframework.security.core.Authentication;
import com.mtgdistrict.backend.models.Usuario;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/mazos")
public class MazoController {

    @Autowired
    private IMazoService mazoService;

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private ICartaService cartaService;

    @Autowired
    private IMazoCartaService mazoCartaService;

    @GetMapping
    public ResponseEntity<List<Mazo>> getAllMazos() {
        List<Mazo> mazos = mazoService.getAllMazos();
        return new ResponseEntity<>(mazos, HttpStatus.OK);
    }

    @GetMapping("/usuario")
    public ResponseEntity<List<Mazo>> getMazosByUsuario(Authentication authentication) {
        String email = authentication.getName();
        Usuario usuario = usuarioService.findByEmail(email);
        List<Mazo> mazos = mazoService.getMazosByUsuario(usuario);
        return new ResponseEntity<>(mazos, HttpStatus.OK);
    }    @GetMapping("/{id}")
    public ResponseEntity<Mazo> getMazoById(@PathVariable Long id) {
        Mazo mazo = mazoService.getMazoById(id);
        return new ResponseEntity<>(mazo, HttpStatus.OK);
    }    @PostMapping
    public ResponseEntity<Mazo> createMazo(@RequestBody Mazo mazo, Authentication authentication) {
        String email = authentication.getName();
        Usuario usuario = usuarioService.findByEmail(email);
        mazo.setUsuario(usuario);
        Mazo nuevoMazo = mazoService.createMazo(mazo);
        return new ResponseEntity<>(nuevoMazo, HttpStatus.CREATED);
    }    @PutMapping("/{id}")
    public ResponseEntity<Mazo> updateMazo(@PathVariable Long id, @RequestBody Mazo mazo) {
        Mazo mazoActualizado = mazoService.updateMazo(id, mazo);
        return new ResponseEntity<>(mazoActualizado, HttpStatus.OK);
    }    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMazo(@PathVariable Long id) {
        mazoService.deleteMazo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/test")
    public String test(@RequestBody Map<String, Object> body) {
        return "OK";
    }
    @PostMapping("/{idMazo}/cartas")
    public ResponseEntity<?> addCartaToMazo(
            @PathVariable Long idMazo,
            @RequestBody AddCartaRequest request) {

        Mazo mazo = mazoService.getMazoById(idMazo);
        if (mazo == null) {
            return ResponseEntity.notFound().build();
        }

        Optional<Carta> cartaOpt = cartaService.findByNombreCarta(request.getNombreCarta());
        if (cartaOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Carta no encontrada");
        }        Carta carta = cartaOpt.get();
        MazoCarta mazoCarta = mazoCartaService.findByMazoAndCarta(mazo, carta);        if (mazoCarta != null) {
            mazoCarta.setCantidad(mazoCarta.getCantidad() + request.getCantidad());
        } else {
            mazoCarta = new MazoCarta();
            mazoCarta.setMazo(mazo);
            mazoCarta.setCarta(carta);
            mazoCarta.setCantidad(request.getCantidad());
        }
        mazoCartaService.save(mazoCarta);

        return ResponseEntity.ok().build();
    }    public static class AddCartaRequest {
        private String nombreCarta;
        private int cantidad;

        public String getNombreCarta() { return nombreCarta; }
        public void setNombreCarta(String nombreCarta) { this.nombreCarta = nombreCarta; }
        public int getCantidad() { return cantidad; }
        public void setCantidad(int cantidad) { this.cantidad = cantidad; }
    }
}

