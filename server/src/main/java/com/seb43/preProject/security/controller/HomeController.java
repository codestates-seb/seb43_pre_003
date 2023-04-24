package com.seb43.preProject.security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 임시 컨트롤러
 */

@RestController
public class HomeController {
    @GetMapping("/")
    public String home(Model model) {
        return "home";
    }

}
