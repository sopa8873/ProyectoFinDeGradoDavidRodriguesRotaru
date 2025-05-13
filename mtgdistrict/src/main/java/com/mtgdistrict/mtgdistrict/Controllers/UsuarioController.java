package com.mtgdistrict.mtgdistrict.Controllers;

import com.mtgdistrict.mtgdistrict.Models.Usuario;
import com.mtgdistrict.mtgdistrict.Services.ServicioUsuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final ServicioUsuario servicioUsuario;

    public UsuarioController(ServicioUsuario ServicioUsuario) {
        this.servicioUsuario = ServicioUsuario;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        return ResponseEntity.ok(servicioUsuario.findAll());
    }

    @GetMapping("/id")
    public ResponseEntity<Usuario> getUsuarioById(){
        return null;
    }
}


