package com.xwiggy.food.controller;

import com.xwiggy.food.dao.FoodDaoImpl;
import com.xwiggy.food.model.Food;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class FoodController {

    @Autowired
    FoodDaoImpl foodDao;

    @GetMapping("/menu")
    public List<Food> getMenu() {
        return foodDao.getFoodList();
    }


}
