package com.mtgdistrict.backend.services;

public interface IAuthService {
    public String login(String username, String password);
    public String register(String username, String password);
    public String logout(String token);
    public boolean isAuthenticated(String token);
    public String refreshToken(String token);
    public String getUsernameFromToken(String token);
    public String getUserIdFromToken(String token);
    public String getRoleFromToken(String token);
    public String getPermissionsFromToken(String token);
    public String generateToken(String username, String role, String permissions);
    public String validateToken(String token);
    public String revokeToken(String token);
    public String changePassword(String username, String oldPassword, String newPassword);
}
