package com.mtgdistrict.backend.security;

public class JjwtVersionTest {
    public static void main(String[] args) {
        System.out.println(io.jsonwebtoken.Jwts.class.getPackage().getImplementationVersion());
        // Prueba si parserBuilder existe
        try {
            io.jsonwebtoken.Jwts.class.getMethod("parserBuilder");
            System.out.println("parserBuilder() está disponible");
        } catch (NoSuchMethodException e) {
            System.out.println("parserBuilder() NO está disponible");
        }
    }
}