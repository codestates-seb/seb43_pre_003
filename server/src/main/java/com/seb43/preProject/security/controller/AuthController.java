package com.seb43.preProject.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 임시 컨트롤러
 */
@RestController
@RequestMapping("/auths")
public class AuthController {
    @GetMapping("/login")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }

    @PostMapping("/login")
    public String login() {
        System.out.println("Login successfully!");
        return "home";
    }
}
