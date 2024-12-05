package com.xwiggy.food.dao;

import javax.persistence.NoResultException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xwiggy.food.model.Login;
import com.xwiggy.food.model.User;

@Component
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
        return userDao.save(user);
    }

    public boolean usernameExists(String username) {
        return userDao.findByUsername(username) != null;
    }
     @Override
       public User findByUsername(String username) {
           try {
               return entityManager.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                   .setParameter("username", username)
                   .getSingleResult();
           } catch (NoResultException e) {
               return null; // Handle case where user is not found
           }
       }
    // Add other necessary methods that delegate to userDao
}
