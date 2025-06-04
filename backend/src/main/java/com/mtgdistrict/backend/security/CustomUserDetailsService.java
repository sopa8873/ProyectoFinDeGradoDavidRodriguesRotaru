package com.mtgdistrict.backend.security;

import com.mtgdistrict.backend.models.Usuario;
import com.mtgdistrict.backend.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return User.builder()
            .username(usuario.getUsername())
            .password(usuario.getPassword())
            .roles("USER") // o usa usuario.getRol() si tienes roles en tu entidad
            .build();
    }
}