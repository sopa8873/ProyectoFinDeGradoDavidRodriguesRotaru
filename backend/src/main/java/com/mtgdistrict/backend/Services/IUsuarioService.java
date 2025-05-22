package com.mtgdistrict.backend.Services;

import java.util.List;
import java.util.Optional;

import com.mtgdistrict.backend.Models.Usuario;

public interface IUsuarioService {
    public List<Usuario> findAll();
    public Optional<Usuario> findById(Long id);
    public Usuario save(Usuario usuario);
    public void deleteById(Long id);
    public Usuario update(Usuario usuario);
}