package com.mtgdistrict.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mtgdistrict.backend.dto.DatosPublicosUsuario;
import com.mtgdistrict.backend.models.Mazo;
import com.mtgdistrict.backend.models.Usuario;
import com.mtgdistrict.backend.services.IUsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        
        List<Usuario> usuarios = usuarioService.getAllUsuarios();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Long id) {
        Usuario usuario = usuarioService.getUsuarioById(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.createUsuario(usuario);
        return new ResponseEntity<>(nuevoUsuario, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        Usuario usuarioActualizado = usuarioService.updateUsuario(id, usuario);
        return new ResponseEntity<>(usuarioActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuario(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/publico/{nombreUsuario}")
    public ResponseEntity<DatosPublicosUsuario> getUsuarioPublico(@PathVariable String nombreUsuario) {
        Usuario usuario = usuarioService.findByNombreUsuario(nombreUsuario);
        if (usuario == null) {
            return ResponseEntity.notFound().build();
        }
        List<Mazo> mazosPublicos = usuario.getMazos().stream()
            .filter(Mazo::isVisibilidadMazo)
            .toList();

        DatosPublicosUsuario dto = new DatosPublicosUsuario(
            usuario.getNombreUsuario(),
            usuario.getAvatarUsuario(),
            mazosPublicos
        );
        return ResponseEntity.ok(dto);
    }
}
