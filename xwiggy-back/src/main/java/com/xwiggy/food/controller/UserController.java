package com.xwiggy.food.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.xwiggy.food.dao.UserDaoImpl;
import com.xwiggy.food.model.Login;
import com.xwiggy.food.model.User;
import com.xwiggy.food.security.JwtUtil;

@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserDaoImpl userDao;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> loginProcess(@RequestBody Login login) {
        User user = userDao.validateUser(login);
        if (user != null) {
            String token = jwtUtil.generateToken(user.getUsername());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userDao.usernameExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Username already exists");
        }
        User savedUser = userDao.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/checkUsername")
    public ResponseEntity<?> checkUsername(@RequestBody String username) {
        boolean exists = userDao.usernameExists(username);
        return ResponseEntity.ok(exists);
    }
} 