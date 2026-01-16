package com.groups.aws.Grouping.controller;

import com.groups.aws.Grouping.dto.*;
import com.groups.aws.Grouping.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // LOGIN
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }


    // FORCE NEW PASSWORD (NEW_PASSWORD_REQUIRED)

    // FORGOT PASSWORD (SEND OTP)
    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request); // ✅ PASS DTO, NOT STRING
    }

    // RESET PASSWORD (OTP + NEW PASSWORD)
    @PostMapping("/reset-password")
    public void resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
    }

    // LOGOUT
    @PostMapping("/logout")
    public void logout(
            @RequestHeader("Authorization")  String token
    ) {
        authService.logout(token.replace("Bearer ", ""));
    }

    // REVOKE REFRESH TOKEN
    @PostMapping("/revoke")
    public void revoke(@RequestBody RevokeRequest request) {
        authService.revokeRefreshToken(request.getRefreshToken());
    }
    @PostMapping("/set-new-password")
    public AuthResponse setNewPassword(@RequestBody NewPasswordRequest request) {
        return authService.setNewPassword(request);
    }

}
