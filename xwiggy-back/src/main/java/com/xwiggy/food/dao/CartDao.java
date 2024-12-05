package com.xwiggy.food.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.xwiggy.food.model.Cart;
import java.util.List;

public interface CartDao extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(String userId);
}
