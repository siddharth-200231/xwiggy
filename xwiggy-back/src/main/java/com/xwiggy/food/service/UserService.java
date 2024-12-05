package com.xwiggy.food.service;

import com.xwiggy.food.model.User;

import org.springframework.security.core.userdetails.UserDetails;

import com.xwiggy.food.model.Login;

public interface UserService {
    User validateUser(Login login);
    User findByUsername(String username); 
        UserDetails loadUserByUsername(String username);  // Add this method
 // Add this method

}