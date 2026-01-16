package com.groups.aws.Grouping.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String idToken;
    private String refreshToken;
    private String message;
    private String username;
}
