package com.mtgdistrict.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordRequest {
    private String emailUsuario;
    private String newPassword;
}
