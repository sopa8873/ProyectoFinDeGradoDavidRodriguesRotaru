package com.mtgdistrict.backend.controllers;

import com.mtgdistrict.backend.dto.AuthRequest;
import com.mtgdistrict.backend.dto.AuthResponse;
import com.mtgdistrict.backend.dto.RegisterRequest;
import com.mtgdistrict.backend.dto.ChangePasswordRequest;
import com.mtgdistrict.backend.security.JwtUtil;
import com.mtgdistrict.backend.services.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private IUsuarioService usuarioService;

    private RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getEmailUsuario(),
                            authRequest.getPasswordUsuario()
                    )
            );
            String token = jwtUtil.generateToken(authentication.getName());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest registerRequest) {
        try {
            usuarioService.createUsuarioFromRegister(registerRequest);
            return ResponseEntity.ok("Usuario registrado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al registrar el usuario");
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
        try {
            usuarioService.changePassword(request.getEmailUsuario(), request.getNewPassword());
            return ResponseEntity.ok("Contraseña cambiada correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al cambiar la contraseña");
        }
    }
}
