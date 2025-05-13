package com.mtgdistrict.mtgdistrict.Services;

import org.springframework.stereotype.Service;

import com.mtgdistrict.mtgdistrict.Models.Usuario;
import com.mtgdistrict.mtgdistrict.Repositories.IUsuarioRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ServicioUsuario{

    @Autowired
    private IUsuarioRepository repository;

    public List<Usuario> findAll() {
        return repository.findAll();
    }

    public Optional<Usuario> findById(Long id) {
        return repository.findById(id);
    }

    public Usuario save(Usuario usuario) {
        return repository.save(Usuario);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    public Usuario update(Usuario usuario){
        Usuario UserToUpdate = 
    }

}