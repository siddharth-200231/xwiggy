package com.xwiggy.food.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xwiggy.food.dao.UserDaoImpl;
import com.xwiggy.food.model.Login;
import com.xwiggy.food.model.User;
import com.xwiggy.food.security.JwtUtil;
import com.xwiggy.food.utility.StrongAES;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin
public class UserDao {

    @Autowired
    private UserDaoImpl userDao;

    @Autowired
    private JwtUtil jwtUtil;

    @RequestMapping("/login")
    public Login showLogin() {
        return new Login();
    }

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

    @RequestMapping("/xx")
    private String xx(){
        return new StrongAES().encrypt("");
    }
    

}
