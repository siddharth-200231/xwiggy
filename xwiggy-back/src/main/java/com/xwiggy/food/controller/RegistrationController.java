package com.xwiggy.food.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.xwiggy.food.dao.UserDaoImpl;
import com.xwiggy.food.model.User;

@RestController
@CrossOrigin()
public class RegistrationController {

    @Autowired
    private UserDaoImpl userDao;

    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody User user) {
        if (userDao.usernameExists(user.getUsername())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body("Username already exists");
        }
        userDao.register(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(user);
    }

    @PostMapping("/checkUserName")
    public ResponseEntity<?> checkAvailability(@RequestBody String username) {
        boolean exists = userDao.usernameExists(username);
        return ResponseEntity.ok(exists);
    }
}
