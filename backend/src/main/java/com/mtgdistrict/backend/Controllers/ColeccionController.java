package com.mtgdistrict.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.mtgdistrict.backend.models.Coleccion;
import com.mtgdistrict.backend.models.Usuario;
import com.mtgdistrict.backend.services.IColeccionService;
import com.mtgdistrict.backend.services.IUsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/colecciones")
public class ColeccionController {

    @Autowired
    private IColeccionService coleccionService;

    @Autowired
    private IUsuarioService usuarioService;

    // Obtener todas las colecciones
    @GetMapping
    public ResponseEntity<List<Coleccion>> getAllColecciones() {
        List<Coleccion> colecciones = coleccionService.getAllColecciones();
        return new ResponseEntity<>(colecciones, HttpStatus.OK);
    }

    @GetMapping("/usuario")
    public ResponseEntity<List<Coleccion>> getColeccionesByUsuario(Authentication authentication) {
        String email = authentication.getName();
        Usuario usuario = usuarioService.findByEmail(email);
        List<Coleccion> colecciones = coleccionService.getColeccionesByUsuario(usuario);
        return new ResponseEntity<>(colecciones, HttpStatus.OK);
    }

    // Obtener una colección por su ID
    @GetMapping("/{id}")
    public ResponseEntity<Coleccion> getColeccionById(@PathVariable Long id) {
        Coleccion coleccion = coleccionService.getColeccionById(id);
        return new ResponseEntity<>(coleccion, HttpStatus.OK);
    }

    // Crear una nueva colección
    @PostMapping
    public ResponseEntity<Coleccion> createColeccion(@RequestBody Coleccion coleccion) {
        Coleccion nuevaColeccion = coleccionService.createColeccion(coleccion);
        return new ResponseEntity<>(nuevaColeccion, HttpStatus.CREATED);
    }

    // Actualizar una colección existente
    @PutMapping("/{id}")
    public ResponseEntity<Coleccion> updateColeccion(@PathVariable Long id, @RequestBody Coleccion coleccion) {
        Coleccion coleccionActualizada = coleccionService.updateColeccion(id, coleccion);
        return new ResponseEntity<>(coleccionActualizada, HttpStatus.OK);
    }

    // Eliminar una colección por su ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColeccion(@PathVariable Long id) {
        coleccionService.deleteColeccion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
