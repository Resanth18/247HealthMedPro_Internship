package com.groups.aws.Grouping.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class DemoController {

    @GetMapping("/user")
    public String user() {
        return "User access";
    }

    @PreAuthorize("hasAuthority('admin')")
    @GetMapping("/admin")
    public String admin() {
        return "Admin access";
    }

    @PreAuthorize("hasAuthority('superadmin')")
    @GetMapping("/superadmin")
    public String superadmin() {
        return "Superadmin access";
    }
}
