package com.mtgdistrict.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.services.IMazoService;

import org.springframework.security.core.Authentication;
import com.mtgdistrict.backend.models.Usuario;
import com.mtgdistrict.backend.services.IUsuarioService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mazos")
public class MazoController {

    @Autowired
    private IMazoService mazoService;

    @Autowired
    private IUsuarioService usuarioService;

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
    }

    // Obtener un mazo por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Mazo> getMazoById(@PathVariable Long id) {
        Mazo mazo = mazoService.getMazoById(id);
        return new ResponseEntity<>(mazo, HttpStatus.OK);
    }

    // Crear un nuevo mazo
    @PostMapping
    public ResponseEntity<Mazo> createMazo(@RequestBody Mazo mazo) {
        System.out.println("Mazo recibido: " + mazo); // Esto imprime el objeto en consola
        Mazo nuevoMazo = mazoService.createMazo(mazo);
        return new ResponseEntity<>(nuevoMazo, HttpStatus.CREATED);
    }

    // Actualizar un mazo existente
    @PutMapping("/{id}")
    public ResponseEntity<Mazo> updateMazo(@PathVariable Long id, @RequestBody Mazo mazo) {
        Mazo mazoActualizado = mazoService.updateMazo(id, mazo);
        return new ResponseEntity<>(mazoActualizado, HttpStatus.OK);
    }

    // Eliminar un mazo por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMazo(@PathVariable Long id) {
        mazoService.deleteMazo(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/test")
    public String test(@RequestBody Map<String, Object> body) {
        return "OK";
    }
}

