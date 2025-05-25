package com.mtgdistrict.backend.services;

public interface IAuthService {
    public String login(String email, String password);
    public String register(String email, String password);
    public String refreshToken(String token);
}
