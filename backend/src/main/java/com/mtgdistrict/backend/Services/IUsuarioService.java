package com.mtgdistrict.backend.services;

import java.util.List;

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
}
