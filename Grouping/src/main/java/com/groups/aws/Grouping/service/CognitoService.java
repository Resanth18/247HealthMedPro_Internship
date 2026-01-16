package com.groups.aws.Grouping.service;

import com.groups.aws.Grouping.dto.CreateUserRequest;

public interface CognitoService {

    String createUser(CreateUserRequest request);

}
