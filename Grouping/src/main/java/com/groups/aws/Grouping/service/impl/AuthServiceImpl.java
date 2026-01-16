package com.groups.aws.Grouping.service.impl;

import com.groups.aws.Grouping.dto.*;
import com.groups.aws.Grouping.dto.ForgotPasswordRequest;
import com.groups.aws.Grouping.service.AuthService;
import com.groups.aws.Grouping.util.SecretHashUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.cognitoidentityprovider.model.RevokeTokenRequest;

import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final CognitoIdentityProviderClient cognitoClient;

    @Value("${aws.cognito.userPoolId}")
    private String userPoolId;

    @Value("${aws.cognito.clientId}")
    private String clientId;

    @Value("${aws.cognito.clientSecret}")
    private String clientSecret;

    // ========================= LOGIN =========================
    @Override
    public AuthResponse login(LoginRequest request) {

        String secretHash = SecretHashUtil.calculateSecretHash(
                request.getUsername(),
                clientId,
                clientSecret
        );

        Map<String, String> authParams = new HashMap<>();
        authParams.put("USERNAME", request.getUsername());
        authParams.put("PASSWORD", request.getPassword()); // 🔴 THIS MUST NOT BE NULL
        authParams.put("SECRET_HASH", secretHash);

        AdminInitiateAuthRequest authRequest =
                AdminInitiateAuthRequest.builder()
                        .userPoolId(userPoolId)
                        .clientId(clientId)
                        .authFlow(AuthFlowType.ADMIN_USER_PASSWORD_AUTH)
                        .authParameters(authParams)
                        .build();

        AdminInitiateAuthResponse response =
                cognitoClient.adminInitiateAuth(authRequest);

        // 🔐 FIRST LOGIN → FORCE PASSWORD CHANGE
        if (ChallengeNameType.NEW_PASSWORD_REQUIRED.equals(response.challengeName())) {
            return new AuthResponse(
                    null,
                    null,
                    null,
                    response.session(),
                    "NEW_PASSWORD_REQUIRED"
            );
        }

        AuthenticationResultType result = response.authenticationResult();

        return new AuthResponse(
                result.accessToken(),
                result.idToken(),
                result.refreshToken(),
                null,
                "LOGIN_SUCCESS"
        );
    }



    // ================= FORCE CHANGE PASSWORD =================
    @Override
    public AuthResponse setNewPassword(NewPasswordRequest request) {

        String secretHash = SecretHashUtil.calculateSecretHash(
                request.getUsername(),
                clientId,
                clientSecret
        );

        Map<String, String> responses = new HashMap<>();
        responses.put("USERNAME", request.getUsername());
        responses.put("NEW_PASSWORD", request.getNewPassword());
        responses.put("SECRET_HASH", secretHash);

        RespondToAuthChallengeRequest challengeRequest =
                RespondToAuthChallengeRequest.builder()
                        .clientId(clientId)
                        .challengeName(ChallengeNameType.NEW_PASSWORD_REQUIRED)
                        .session(request.getSession())
                        .challengeResponses(responses)
                        .build();

        RespondToAuthChallengeResponse response =
                cognitoClient.respondToAuthChallenge(challengeRequest);

        AuthenticationResultType result = response.authenticationResult();

        return new AuthResponse(
                result.accessToken(),
                result.idToken(),
                result.refreshToken(),
                null,
                "PASSWORD_CHANGED_SUCCESS"
        );
    }




    // ================= FORGOT PASSWORD =================
    @Override
    public void forgotPassword(ForgotPasswordRequest request) {

        String secretHash = SecretHashUtil.calculateSecretHash(
                request.getUsername(),
                clientId,
                clientSecret
        );

        software.amazon.awssdk.services.cognitoidentityprovider.model.ForgotPasswordRequest cognitoRequest =
                software.amazon.awssdk.services.cognitoidentityprovider.model.ForgotPasswordRequest.builder()
                        .clientId(clientId)
                        .username(request.getUsername())
                        .secretHash(secretHash)
                        .build();

        cognitoClient.forgotPassword(cognitoRequest);
    }


    // ================= RESET PASSWORD =================
    @Override
    public void resetPassword(ResetPasswordRequest request) {

        String secretHash = SecretHashUtil.calculateSecretHash(
                request.getUsername(),
                clientId,
                clientSecret
        );

        ConfirmForgotPasswordRequest confirmRequest =
                ConfirmForgotPasswordRequest.builder()
                        .clientId(clientId)
                        .username(request.getUsername())
                        .confirmationCode(request.getCode())
                        .password(request.getNewPassword())
                        .secretHash(secretHash)
                        .build();

        cognitoClient.confirmForgotPassword(confirmRequest);
    }

    // ================= LOGOUT =================
    @Override
    public void logout(String accessToken) {

        GlobalSignOutRequest request =
                GlobalSignOutRequest.builder()
                        .accessToken(accessToken)
                        .build();

        cognitoClient.globalSignOut(request);
    }

    // ================= REVOKE REFRESH TOKEN =================
    @Override
    public void revokeRefreshToken(String refreshToken) {

        RevokeTokenRequest revokeRequest =
                RevokeTokenRequest.builder()
                        .clientId(clientId)
                        .clientSecret(clientSecret)
                        .token(refreshToken)
                        .build();

        cognitoClient.revokeToken(revokeRequest);
    }

}
