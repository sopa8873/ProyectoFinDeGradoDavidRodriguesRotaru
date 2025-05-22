package com.mtgdistrict.backend.Services;

import java.util.List;

import com.mtgdistrict.backend.Models.Usuario;

public interface IUsuarioService {
    public List<Usuario> findAll();
    public Usuario getUsuarioById(Long id);
    public Usuario createUsuario(Usuario usuario);
    public boolean deleteUsuario(Long id);
    public Usuario updateUsuario(Long id, Usuario usuario);
}