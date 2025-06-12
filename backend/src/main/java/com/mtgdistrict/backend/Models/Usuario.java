package com.mtgdistrict.backend.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@NamedQuery(name = "Usuario.findByEmailUsuario",query = "SELECT u FROM Usuario u WHERE u.emailUsuario = :emailUsuario")

@Entity
@Table(name = "Usuario")
@Data
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column
    private String avatarUsuario = "/uploads/avatars/default.jpg";

    @Column(nullable = false, unique = true)
    private String nombreUsuario;

    @Column(nullable = false, unique = true)
    private String emailUsuario;

    @Column(nullable = false)
    private String passwordUsuario;

    @Column(nullable = false, insertable = false, updatable = false)
    private Timestamp fechaRegistroUsuario;

    @OneToMany(mappedBy = "usuario")
    @JsonBackReference("usuario-mazo")
    private List<Mazo> mazos;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonManagedReference("usuario-coleccion")
    private List<Coleccion> colecciones;
}
