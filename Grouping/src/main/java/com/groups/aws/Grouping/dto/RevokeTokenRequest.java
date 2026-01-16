package com.groups.aws.Grouping.dto;

import lombok.Data;

@Data
public class RevokeTokenRequest {
    private String refreshToken;
}
