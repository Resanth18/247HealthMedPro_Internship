package com.groups.aws.Grouping.service;

import com.groups.aws.Grouping.dto.*;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    AuthResponse setNewPassword(NewPasswordRequest request);

    void forgotPassword(ForgotPasswordRequest request);

    void resetPassword(ResetPasswordRequest request);

    void logout(String accessToken);

    void revokeRefreshToken(String refreshToken);
}


