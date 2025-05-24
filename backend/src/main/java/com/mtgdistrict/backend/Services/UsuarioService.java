package com.mtgdistrict.backend.services;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtgdistrict.backend.models.Usuario;
import com.mtgdistrict.backend.repositories.UsuarioRepository;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> getAllUsuarios() {
        return (List<Usuario>) usuarioRepository.findAll();
    }

    @Override
    public Usuario getUsuarioById(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario not found with id: " + id));
    }

    @Override
    public Usuario createUsuario(Usuario usuario) {
        // Validations can be added here before saving
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Long id, Usuario usuario) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario not found with id: " + id));

        existingUsuario.setNombreUsuario(usuario.getNombreUsuario());
        existingUsuario.setEmailUsuario(usuario.getEmailUsuario());
        existingUsuario.setPasswordUsuario(usuario.getPasswordUsuario());

        return usuarioRepository.save(existingUsuario);
    }

    @Override
    public void deleteUsuario(Long id) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario not found with id: " + id));
        usuarioRepository.delete(existingUsuario);
    }

}
