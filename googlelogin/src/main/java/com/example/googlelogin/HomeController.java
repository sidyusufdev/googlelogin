package com.example.googlelogin;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home(@AuthenticationPrincipal OAuth2User principal) {

        if (principal == null) {
            return "User not authenticated!";
        }

        String name = principal.getAttribute("name");

        return "Welcome, " + name + "! Aapka login successful hai.";
    }
}