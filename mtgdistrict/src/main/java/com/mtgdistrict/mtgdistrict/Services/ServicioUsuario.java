package com.mtgdistrict.mtgdistrict.Services;

import org.springframework.stereotype.Service;

import com.mtgdistrict.mtgdistrict.Models.Usuario;
import com.mtgdistrict.mtgdistrict.Repositories.UsuarioRepository;

@Service
public class ServicioUsuario extends CrudService<Usuario, Integer>{

    private final UsuarioRepository usuarioRepository;

    protected ServicioUsuario(UsuarioRepository usuarioRepository) {
        super(usuarioRepository);
        this.usuarioRepository = usuarioRepository;
    }

}