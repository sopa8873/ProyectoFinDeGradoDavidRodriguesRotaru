package com.mtgdistrict.backend.models;

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
    private String avatarUsuario = "/images/avatars/usuario123.jpg";

    @Column(nullable = false, unique = true)
    private String nombreUsuario;

    @Column(nullable = false, unique = true)
    private String emailUsuario;

    @Column(nullable = false)
    private String passwordUsuario;

    @Column(nullable = false, insertable = false, updatable = false)
    private Timestamp fechaRegistroUsuario;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Mazo> mazos;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    private List<Coleccion> colecciones;
}
