package com.mtgdistrict.backend.services;

import java.util.List;

import com.mtgdistrict.backend.dto.RegisterRequest;
import com.mtgdistrict.backend.models.Usuario;


public interface IUsuarioService {

    List<Usuario> getAllUsuarios();
    
    Usuario getUsuarioById(Long id);

    Usuario createUsuario(Usuario usuario);

    Usuario updateUsuario(Long id, Usuario usuario);

    void deleteUsuario(Long id);

    Usuario findByEmail(String emailUsuario);

    Usuario findByNombreUsuario(String nombreUsuario);

    void createUsuarioFromRegister(RegisterRequest registerRequest);

    boolean changePassword(String emailUsuario, String newPassword);
}
