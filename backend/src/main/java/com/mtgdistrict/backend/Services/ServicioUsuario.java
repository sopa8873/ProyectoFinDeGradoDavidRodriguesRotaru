package com.mtgdistrict.backend.Services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mtgdistrict.backend.Models.Usuario;
import com.mtgdistrict.backend.Repositories.IUsuarioRepository;

@Service
public class ServicioUsuario {

    private final IUsuarioRepository repository;

    public ServicioUsuario(IUsuarioRepository repository) {
        this.repository = repository;
    }

    public List<Usuario> findAll() {
        return repository.findAll();
    }

    public Usuario getUsuarioById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Usuario createUsuario(Usuario usuario) {
        usuario.setFechaRegistroUsuario(new Timestamp(System.currentTimeMillis()));
        return repository.save(usuario);
    }

    public Usuario updateUsuario(Long id, Usuario usuario) {
        Optional<Usuario> optionalUsuario = repository.findById(id);
        if (optionalUsuario.isEmpty()) {
            return null; // puedes usar un ApiResponse aquí si quieres
        }

        Usuario userToUpdate = optionalUsuario.get();
        userToUpdate.setNombreUsuario(usuario.getNombreUsuario());
        userToUpdate.setEmailUsuario(usuario.getEmailUsuario());
        userToUpdate.setPasswordUsuario(usuario.getPasswordUsuario());

        return repository.save(userToUpdate);
    }

    public boolean deleteUsuario(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
