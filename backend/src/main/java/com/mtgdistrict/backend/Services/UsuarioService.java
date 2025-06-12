package com.mtgdistrict.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.mtgdistrict.backend.dto.RegisterRequest;
import com.mtgdistrict.backend.models.Usuario;
import com.mtgdistrict.backend.repositories.UsuarioRepository;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        // Hashea la contraseña antes de guardar
        usuario.setPasswordUsuario(passwordEncoder.encode(usuario.getPasswordUsuario()));
        return usuarioRepository.save(usuario);
    }

    @Override
    public Usuario updateUsuario(Long id, Usuario usuario) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario not found with id: " + id));

        existingUsuario.setNombreUsuario(usuario.getNombreUsuario());
        existingUsuario.setEmailUsuario(usuario.getEmailUsuario());
        // Solo hashea si la contraseña ha cambiado
        if (!usuario.getPasswordUsuario().equals(existingUsuario.getPasswordUsuario())) {
            existingUsuario.setPasswordUsuario(passwordEncoder.encode(usuario.getPasswordUsuario()));
        }
        existingUsuario.setAvatarUsuario(usuario.getAvatarUsuario());

        return usuarioRepository.save(existingUsuario);
    }

    @Override
    public void deleteUsuario(Long id) {
        Usuario existingUsuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario not found with id: " + id));
        usuarioRepository.delete(existingUsuario);
    }

    @Override
    public Usuario findByEmail(String emailUsuario) {
        return usuarioRepository.findByEmailUsuario(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario not found with email: " + emailUsuario));
    }

    @Override
    public Usuario findByNombreUsuario(String nombreUsuario) {
        return usuarioRepository.findByNombreUsuario(nombreUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario not found with nombre: " + nombreUsuario));
        }

    public String getNombrePorEmail(String email) {
        return usuarioRepository.findByEmailUsuario(email)
                .map(Usuario::getNombreUsuario) // si existe, obtiene el nombre
                .orElse(""); // si no existe, cadena vacía o null
    }

    public void createUsuarioFromRegister(RegisterRequest registerRequest) {
        Usuario usuario = new Usuario();
        usuario.setNombreUsuario(registerRequest.getNombreUsuario());
        usuario.setEmailUsuario(registerRequest.getEmailUsuario());
        usuario.setPasswordUsuario(passwordEncoder.encode(registerRequest.getPasswordUsuario()));
        // ...otros campos por defecto si quieres...
        usuarioRepository.save(usuario);
    }

    public boolean changePassword(String emailUsuario, String newPassword) {
        Usuario usuario = findByEmail(emailUsuario);
        usuario.setPasswordUsuario(passwordEncoder.encode(newPassword));
        usuarioRepository.save(usuario);
        return true;
    }
}
