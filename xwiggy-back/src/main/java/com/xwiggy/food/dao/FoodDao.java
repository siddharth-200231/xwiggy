package com.xwiggy.food.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xwiggy.food.model.Food;

@Repository
public interface FoodDao extends JpaRepository<Food,String> {

}
