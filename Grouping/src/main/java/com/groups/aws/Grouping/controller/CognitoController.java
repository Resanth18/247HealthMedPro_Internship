package com.groups.aws.Grouping.controller;

import com.groups.aws.Grouping.dto.CreateUserRequest;
import com.groups.aws.Grouping.service.CognitoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cognito")
@RequiredArgsConstructor
public class CognitoController {

    private final CognitoService cognitoService;

    @PostMapping("/users")
    public String createUser(@RequestBody CreateUserRequest request) {
        return cognitoService.createUser(request);
    }
}
