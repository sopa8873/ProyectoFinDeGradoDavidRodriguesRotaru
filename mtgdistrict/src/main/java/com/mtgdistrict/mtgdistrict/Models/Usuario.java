package com.mtgdistrict.mtgdistrict.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario{

    @Id
    @Column(name = "IDUsuario")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "NombreUsuario", nullable = false, unique = true)
    private String nombreUsuario;

    @Column(name = "EmailUsuario", nullable = false, unique = true)
    private String emailUsuario;
    
    @Column(name = "PasswordUsuario", nullable = false)
    private String passwordUsuario;

    @Column(name = "FechaRegistroUsuario")
    private String fechaRegistroUsuario;
}
