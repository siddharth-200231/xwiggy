package com.xwiggy.food.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.xwiggy.food.model.User;
import com.xwiggy.food.model.Login;
import com.xwiggy.food.service.UserService;
import java.util.HashMap;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        try {
            User user = userService.validateUser(login);
            if (user != null) {
                user.setPassword(null);
                Map<String, Object> response = new HashMap<>();
                response.put("user", user);
                return ResponseEntity.ok(response);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Collections.singletonMap("message", "Invalid username or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("message", "Login failed: " + e.getMessage()));
        }
    }
} 