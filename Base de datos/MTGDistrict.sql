-- BORRADO DE LA BASE DE DATOS EN CASO DE QUE YA EXISTA
DROP DATABASE IF EXISTS mtgdistrictdb;

-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE mtgdistrictdb;

-- USO DE LA BASE DE DATOS
USE mtgdistrictdb;

-- TABLAS
CREATE TABLE usuario (
    id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
    email_usuario VARCHAR(100) NOT NULL UNIQUE,
    password_usuario VARCHAR(255) NOT NULL,
    fecha_registro_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mazo (
    id_mazo BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    nombre_mazo VARCHAR(100) NOT NULL,
    descripcion_mazo VARCHAR(255),
    formato_mazo VARCHAR(20) NOT NULL,
    fecha_creacion_mazo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visibilidad_mazo TINYINT NOT NULL,
    votaciones_positivas_mazo INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE carta (
    id_carta BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre_carta VARCHAR(100) NOT NULL UNIQUE,
    color_carta VARCHAR(20) NOT NULL,
    coste_mana_carta INT NOT NULL,
    imagen_url_carta VARCHAR(100) NOT NULL
);

CREATE TABLE mazo_carta (
    id_mazo BIGINT NOT NULL,
    id_carta BIGINT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id_mazo, id_carta),
    FOREIGN KEY (id_mazo) REFERENCES mazo(id_mazo),
    FOREIGN KEY (id_carta) REFERENCES carta(id_carta)
);

CREATE TABLE coleccion (
    id_coleccion BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    nombre_coleccion VARCHAR(100) NOT NULL,
    descripcion_coleccion VARCHAR(255) NOT NULL,
    fecha_creacion_coleccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE coleccion_carta (
    id_coleccion BIGINT NOT NULL,
    id_carta BIGINT NOT NULL,
    cantidad INT NOT NULL,
    PRIMARY KEY (id_coleccion, id_carta),
    FOREIGN KEY (id_coleccion) REFERENCES coleccion(id_coleccion),
    FOREIGN KEY (id_carta) REFERENCES carta(id_carta)
);

-- INSERCIÓN DE DATOS
INSERT INTO usuario (nombre_usuario, email_usuario, password_usuario)
VALUES ('David', 'david@mtg.com', '1234');

INSERT INTO mazo (id_usuario, nombre_mazo, descripcion_mazo, formato_mazo, visibilidad_mazo, votaciones_positivas_mazo)
VALUES (1, 'Mazo1', 'primer mazo', 'Estandar', 1, 12);

INSERT INTO carta (nombre_carta, color_carta, coste_mana_carta, imagen_url_carta)
VALUES ('Kami', 'Azul', 2, 'urlinventada');

INSERT INTO mazo_carta (id_mazo, id_carta, cantidad)
VALUES (1, 1, 4);

INSERT INTO coleccion (id_usuario, nombre_coleccion, descripcion_coleccion)
VALUES (1, 'Coleccion1', 'DescripcionColeccion');

INSERT INTO coleccion_carta (id_coleccion, id_carta, cantidad)
VALUES (1, 1, 20);
