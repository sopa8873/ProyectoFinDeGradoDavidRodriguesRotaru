-- BORRADO DE LA BASE DE DATOS EN CASO DE QUE YA EXISTA
DROP DATABASE IF EXISTS MTGDistrictDB;

-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE MTGDistrictDB;

-- USO DE LA BASE DE DATOS
USE MTGDistrictDB;

-- TABLAS
CREATE TABLE Usuario (
    IDUsuario INT AUTO_INCREMENT PRIMARY KEY,
    NombreUsuario VARCHAR(100) NOT NULL UNIQUE,
    EmailUsuario VARCHAR(100) NOT NULL UNIQUE,
    PasswordUsuario VARCHAR(255) NOT NULL,
    FechaRegistroUsuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Mazo (
    IDMazo INT AUTO_INCREMENT PRIMARY KEY,
    IDUsuario INT NOT NULL,
    NombreMazo VARCHAR(100) NOT NULL,
    DescripcionMazo VARCHAR(100),
    FormatoMazo VARCHAR(20) NOT NULL,
    FechaCreacionMazo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    VisibilidadMazo TINYINT NOT NULL,
    VotacionesPositivasMazo VARCHAR(100) NOT NULL,
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);

CREATE TABLE Carta (
    IDCarta INT AUTO_INCREMENT PRIMARY KEY,
    NombreCarta VARCHAR(100) NOT NULL UNIQUE,
    ColorCarta VARCHAR(100) NOT NULL,
    CosteManaCarta INT NOT NULL,
    ImagenUrlCarta VARCHAR(100) NOT NULL
);

CREATE TABLE MazoCarta (
    IDMazo INT NOT NULL,
    IDCarta INT NOT NULL,
    Cantidad INT NOT NULL,
    PRIMARY KEY (IDMazo, IDCarta),
    FOREIGN KEY (IDMazo) REFERENCES Mazo(IDMazo),
    FOREIGN KEY (IDCarta) REFERENCES Carta(IDCarta)
);

CREATE TABLE Coleccion (
    IDColeccion INT AUTO_INCREMENT PRIMARY KEY,
    IDUsuario INT NOT NULL,
    NombreColeccion VARCHAR(100) NOT NULL,
    DescripcionColeccion VARCHAR(255) NOT NULL,
    FechaCreacionColeccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (IDUsuario) REFERENCES Usuario(IDUsuario)
);

CREATE TABLE ColeccionCarta (
    IDColeccion INT NOT NULL,
    IDCarta INT NOT NULL,
    Cantidad INT NOT NULL,
    PRIMARY KEY (IDColeccion, IDCarta),
    FOREIGN KEY (IDColeccion) REFERENCES Coleccion(IDColeccion),
    FOREIGN KEY (IDCarta) REFERENCES Carta(IDCarta)
);

-- INSERCIÓN DE DATOS
INSERT INTO Usuario (NombreUsuario, EmailUsuario, PasswordUsuario)
VALUES ("David", "david@mtg.com", "1234");

INSERT INTO Mazo (IDUsuario, NombreMazo, DescripcionMazo, FormatoMazo, VisibilidadMazo, VotacionesPositivasMazo)
VALUES ("1", "Mazo1", "primer mazo", "Estandar", 1, 12);

INSERT INTO Carta (NombreCarta, ColorCarta, CosteManaCarta, ImagenUrlCarta)
VALUES ("Kami", "Azul", 2, "urlinventada");

INSERT INTO MazoCarta (IDMazo, IDCarta, Cantidad)
VALUES (1, 1, 4);

INSERT INTO Coleccion(IDUsuario, NombreColeccion, DescripcionColeccion)
VALUES (1, "Coleccion1", "DescripcionColeccion");

INSERT INTO ColeccionCarta (IDColeccion, IDCarta, Cantidad)
VALUES (1, 1, 20);