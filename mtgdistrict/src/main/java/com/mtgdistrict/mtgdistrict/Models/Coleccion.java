package com.mtgdistrict.mtgdistrict.Models;


import java.sql.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Coleccion")
public class Coleccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDColeccion")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "IDUsuario", nullable = false)
    private Usuario usuario;

    @Column(name = "NombreColeccion", nullable = false)
    private String nombreColeccion;

    @Column(name = "DescripcionColeccion", nullable = false)
    private String descripcionColeccion;

    @Column(name = "FechaCreacionColeccion")
    private Timestamp fechaCreacionColeccion;
}