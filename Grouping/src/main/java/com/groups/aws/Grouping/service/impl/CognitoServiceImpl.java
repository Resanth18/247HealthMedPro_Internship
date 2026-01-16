package com.groups.aws.Grouping.service.impl;

import com.groups.aws.Grouping.dto.CreateUserRequest;
import com.groups.aws.Grouping.service.CognitoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;

@Service
@RequiredArgsConstructor
public class CognitoServiceImpl implements CognitoService {

    private final CognitoIdentityProviderClient cognitoClient;

    @Value("${aws.cognito.user-pool-id}")
    private String userPoolId;

    @Override
    public String createUser(CreateUserRequest request) {

        AdminCreateUserRequest createUserRequest =
                AdminCreateUserRequest.builder()
                        .userPoolId(userPoolId)
                        .username(request.getEmail())
                        .userAttributes(
                                AttributeType.builder()
                                        .name("email")
                                        .value(request.getEmail())
                                        .build(),
                                AttributeType.builder()
                                        .name("email_verified")
                                        .value("true")
                                        .build()
                        )
                        .messageAction(MessageActionType.SUPPRESS)
                        .build();

        cognitoClient.adminCreateUser(createUserRequest);

        AdminSetUserPasswordRequest passwordRequest =
                AdminSetUserPasswordRequest.builder()
                        .userPoolId(userPoolId)
                        .username(request.getEmail())
                        .password(request.getPassword())
                        .permanent(true)
                        .build();

        cognitoClient.adminSetUserPassword(passwordRequest);

        return "User created successfully";
    }
}
