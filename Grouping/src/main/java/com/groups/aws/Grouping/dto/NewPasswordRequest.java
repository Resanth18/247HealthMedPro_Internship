package com.groups.aws.Grouping.dto;

import lombok.Data;

@Data
public class NewPasswordRequest {
    private String username;
    private String newPassword;
    private String session;
}
