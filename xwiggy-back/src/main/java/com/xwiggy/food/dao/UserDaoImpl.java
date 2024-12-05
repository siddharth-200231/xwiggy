package com.xwiggy.food.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.xwiggy.food.model.Login;
import com.xwiggy.food.model.User;

@Service
public class UserDaoImpl {
    @Autowired
    private UserDao userDao;

    
    public User validateUser(Login login) {
        User user = userDao.findByUsername(login.getUsername());
        if (user != null && user.getPassword().equals(login.getPassword())) {
            return user;
        }
        return null;
    }

    public User register(User user) {
        if (userDao.findByUsername(user.getUsername()) != null) {
            return null; // User already exists
        }
        return userDao.save(user);
    }

    public boolean usernameExists(String username) {
        return userDao.findByUsername(username) != null;
    }
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }
    // Add other necessary methods that delegate to userDao
}
