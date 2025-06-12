-- BORRADO DE LA BASE DE DATOS EN CASO DE QUE YA EXISTA
DROP DATABASE IF EXISTS mtgdistrictdb;

-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE mtgdistrictdb;

-- USO DE LA BASE DE DATOS
USE mtgdistrictdb;

-- TABLAS
CREATE TABLE
    usuario (
        id_usuario BIGINT AUTO_INCREMENT PRIMARY KEY,
        avatar_usuario VARCHAR(255) DEFAULT '/images/avatars/usuario123.jpg',
        nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
        email_usuario VARCHAR(100) NOT NULL UNIQUE,
        password_usuario VARCHAR(255) NOT NULL,
        fecha_registro_usuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    mazo (
        id_mazo BIGINT AUTO_INCREMENT PRIMARY KEY,
        id_usuario BIGINT NOT NULL,
        nombre_mazo VARCHAR(100) NOT NULL,
        id_comandante_mazo BIGINT DEFAULT NULL,
        descripcion_mazo VARCHAR(255),
        formato_mazo VARCHAR(20) NOT NULL,
        fecha_creacion_mazo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        visibilidad_mazo TINYINT NOT NULL,
        votaciones_positivas_mazo INT NOT NULL,
        FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
        FOREIGN KEY (comandante_mazo) REFERENCES carta (id_carta)
    );

CREATE TABLE
    carta (
        id_carta BIGINT AUTO_INCREMENT PRIMARY KEY,
        nombre_carta VARCHAR(100) NOT NULL UNIQUE,
        tipo_carta VARCHAR(100),
        texto_carta LONGTEXT, -- Cambiado de TEXT a LONGTEXT para textos largos de cartas
        coste_mana_carta VARCHAR(50),
        cmc INT,
        imagen_url_carta VARCHAR(255),
        imagen_art_crop_carta VARCHAR(255),
        set_carta VARCHAR(100),
        rareza_carta VARCHAR(50)
    );

-- Relación N:M carta <-> color
CREATE TABLE
    carta_color (
        id_carta BIGINT NOT NULL,
        color VARCHAR(10) NOT NULL,
        PRIMARY KEY (id_carta, color),
        FOREIGN KEY (id_carta) REFERENCES carta (id_carta)
    );

CREATE TABLE
    mazo_carta (
        id_mazo BIGINT NOT NULL,
        id_carta BIGINT NOT NULL,
        cantidad INT NOT NULL,
        PRIMARY KEY (id_mazo, id_carta),
        FOREIGN KEY (id_mazo) REFERENCES mazo (id_mazo),
        FOREIGN KEY (id_carta) REFERENCES carta (id_carta)
    );

CREATE TABLE
    coleccion (
        id_coleccion BIGINT AUTO_INCREMENT PRIMARY KEY,
        id_usuario BIGINT NOT NULL,
        nombre_coleccion VARCHAR(100) NOT NULL,
        descripcion_coleccion VARCHAR(255) NOT NULL,
        fecha_creacion_coleccion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
    );

CREATE TABLE
    coleccion_carta (
        id_coleccion BIGINT NOT NULL,
        id_carta BIGINT NOT NULL,
        cantidad INT NOT NULL,
        PRIMARY KEY (id_coleccion, id_carta),
        FOREIGN KEY (id_coleccion) REFERENCES coleccion (id_coleccion),
        FOREIGN KEY (id_carta) REFERENCES carta (id_carta)
    );

-- INSERCIÓN DE USUARIOS CON CONTRASEÑAS HASHEADAS
INSERT INTO
    usuario (nombre_usuario, email_usuario, password_usuario)
VALUES
    (
        'David',
        'david@mtg.com',
        '$2a$10$stvZp9gyclns9iapb0263u6vC9A6BCMGIormCvyj0W5xIbOJptVZy'
    ),
    (
        'Laura',
        'laura@mtg.com',
        '$2a$10$1H2ElfHZqXxfRaWBPls6cOLxVw31IpO.1iaxmjy6esf3LAiOeGudW'
    ),
    (
        'Carlos',
        'carlos@mtg.com',
        '$2a$10$hNVvxWmHK1OXpjkxxYAAZeq8JDvG75q19Qoesf2dSy1gy.AuH/Goy'
    ),
    (
        'Maria',
        'maria@mtg.com',
        '$2a$10$ZFASo3CyDpZ9udxH7nQD4eglm8i5h/Z.bi3Uyj.5JK2CBIuiK7hUW'
    ),
    (
        'Pedro',
        'pedro@mtg.com',
        '$2a$10$97Lrgjrv7fhwXI9svF2.3e6hX4q4iUuzXwffIXi38G1rouRhh.HPi'
    );

-- INSERTAMOS MAZOS
INSERT INTO
    mazo (
        id_usuario,
        nombre_mazo,
        comandante_mazo,
        descripcion_mazo,
        formato_mazo,
        visibilidad_mazo,
        votaciones_positivas_mazo
    )
VALUES
    (1, 'Mazo1', NULL, 'primer mazo', 'Estandar', 1, 12),
    (2, 'Mazo Laura', NULL, 'mazo control', 'Modern', 1, 25),
    (3, 'Mazo Carlos', NULL, 'mazo agresivo', 'Legacy', 0, 7),
    (4, 'Mazo Maria', NULL, 'mazo combo', 'Commander', 1, 32),
    (5, 'Mazo Pedro', NULL, 'mazo burn', 'Pioneer', 1, 15);