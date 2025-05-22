package com.mtgdistrict.backend.Services;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mtgdistrict.backend.Models.Usuario;
import com.mtgdistrict.backend.Repositories.IUsuarioRepository;

@Service
public class ServicioUsuario implements IUsuarioService{

    @Autowired
    private final IUsuarioRepository repository;

    public ServicioUsuario(IUsuarioRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Usuario> findAll() {
        return repository.findAll();
    }
    
    @Override
    public Usuario getUsuarioById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Usuario createUsuario(Usuario usuario) {
        usuario.setFechaRegistroUsuario(new Timestamp(System.currentTimeMillis()));
        return repository.save(usuario);
    }

    @Override
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

    @Override
    public boolean deleteUsuario(Long id) {
        if (!repository.existsById(id)) {
            return false;
        }
        repository.deleteById(id);
        return true;
    }
}
