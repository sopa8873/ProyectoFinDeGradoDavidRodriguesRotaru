package com.mtgdistrict.backend.services;

import java.util.List;

import com.mtgdistrict.backend.dto.RegisterRequest;
import com.mtgdistrict.backend.models.Usuario;


public interface IUsuarioService {

    // Obtener todos los usuarios
    List<Usuario> getAllUsuarios();
    
    // Obtener un usuario por su ID
    Usuario getUsuarioById(Long id);

    // Crear un nuevo usuario
    Usuario createUsuario(Usuario usuario);

    // Actualizar un usuario existente
    Usuario updateUsuario(Long id, Usuario usuario);

    // Eliminar un usuario por su ID
    void deleteUsuario(Long id);

    // Buscar usuario por email
    Usuario findByEmail(String emailUsuario);

    Usuario findByNombreUsuario(String nombreUsuario);

    void createUsuarioFromRegister(RegisterRequest registerRequest);

    boolean changePassword(String emailUsuario, String newPassword);
}
