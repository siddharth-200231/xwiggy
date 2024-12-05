package com.xwiggy.food.dao;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.xwiggy.food.model.Cart;
import com.xwiggy.food.model.Food;
import com.xwiggy.food.model.NewCart;
import com.xwiggy.food.model.NewFood;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class CartDaoImpl{

    @Autowired
    private CartDao cartDao;

    @Autowired
    FoodDao foodDao;

    @Value("${fileStorage}")
    private String storagePath;

    public Cart save(Cart cart) {
        // Delete existing cart for user if exists
        List<Cart> existingCarts = cartDao.findByUserId(cart.getUserId());
        if (!existingCarts.isEmpty()) {
            cartDao.deleteAll(existingCarts);
        }
        return cartDao.save(cart);
    }

    public List<Cart> findByUserId(String userId) {
        return cartDao.findByUserId(userId);
    }

    public void saveToCart(NewCart[] newCarts) {
        if (newCarts == null || newCarts.length == 0) {
            throw new IllegalArgumentException("Cart items cannot be empty");
        }
        
        // Get userId from first cart item
        String userId = newCarts[0].getUserId();
        if (userId == null) {
            throw new IllegalArgumentException("User ID is required");
        }

        // Delete existing carts for this user
        List<Cart> existingCarts = cartDao.findByUserId(userId);
        if (!existingCarts.isEmpty()) {
            cartDao.deleteAll(existingCarts);
        }
        
        Cart cart = new Cart(userId);
        cart.setQuantity1(newCarts[0].getQuantity());
        
        if (newCarts.length > 1) cart.setQuantity2(newCarts[1].getQuantity());
        if (newCarts.length > 2) cart.setQuantity3(newCarts[2].getQuantity());
        if (newCarts.length > 3) cart.setQuantity4(newCarts[3].getQuantity());
        if (newCarts.length > 4) cart.setQuantity5(newCarts[4].getQuantity());
        if (newCarts.length > 5) cart.setQuantity6(newCarts[5].getQuantity());
        
        cartDao.save(cart);
    }

    public void updateDB(){
        List<Cart> carts = cartDao.findAll();
        if (carts.isEmpty()) {
            return;
        }
        Cart cart = carts.get(0);
        List<Food> foods = foodDao.findAll();
        foods.get(0).setQuantity(foods.get(0).getQuantity()-cart.getQuantity1());
        foods.get(1).setQuantity(foods.get(1).getQuantity()-cart.getQuantity2());
        foods.get(2).setQuantity(foods.get(2).getQuantity()-cart.getQuantity3());
        if(foods.size()>3)
        foods.get(3).setQuantity(foods.get(3).getQuantity()-cart.getQuantity4());
        if(foods.size()>4)
            foods.get(4).setQuantity(foods.get(4).getQuantity()-cart.getQuantity5());
        if(foods.size()>5)
            foods.get(5).setQuantity(foods.get(5).getQuantity()-cart.getQuantity6());
        foodDao.saveAll(foods);
    }

    public List<Cart> getAllCart(){
        return cartDao.findAll();
    }

    public void addItems(NewCart[] cart){
        List<Food> foods = foodDao.findAll();
        for(int i=0;i<foods.size();i++){
            foods.get(i).setQuantity(foods.get(i).getQuantity()+cart[i].getQuantity());
        }
        foodDao.saveAll(foods);
    }

    public void addItems(Cart[] cart) {
        NewCart[] newCarts = new NewCart[cart.length];
        for (int i = 0; i < cart.length; i++) {
            NewCart newCart = new NewCart();
            newCart.setQuantity(cart[i].getQuantity1());
            newCarts[i] = newCart;
        }
        addItems(newCarts);
    }

    public boolean addNewItem(MultipartFile file, String newFoodData) throws IOException {
        NewFood newFood = new ObjectMapper().readValue(newFoodData,NewFood.class);
        if(!file.isEmpty()) {
            if(saveFileToAssets(file)) {
                foodDao.save(new Food(newFood.getId(),newFood.getName(),newFood.getPrice(),newFood.getQuantityAvailable(),"/assets/"+file.getOriginalFilename(),"",""));
            }
        }
        return true;
    }

    public boolean addNewItemWithUrl(String newFoodData) throws IOException {
        NewFood newFood = new ObjectMapper().readValue(newFoodData,NewFood.class);
        foodDao.save(new Food(newFood.getId(),newFood.getName(),newFood.getPrice(),newFood.getQuantityAvailable(),newFood.getFileDataF(),"",""));
        return true;
    }

    private boolean saveFileToAssets(MultipartFile file) throws IOException {
        Path filepath = Paths.get(storagePath, file.getOriginalFilename());
        file.transferTo(filepath);
        return true;
    }

    public int calculateTotal(NewCart[] newCart){
        int total=0;
        List<Food> foods = foodDao.findAll();

        for(int i=0;i<foods.size();i++)
        {
            total+=foods.get(i).getPrice()*newCart[i].getQuantity();
        }
        return total;
    }

    public boolean itemIdAvailable(String itemId) {
        return foodDao.findById(itemId).isPresent();
    }

    public List<Cart> findAll() {
        return cartDao.findAll();
    }

    public List<Cart> saveAll(List<Cart> carts) {
        for (Cart cart : carts) {
            save(cart);  // Using your existing save method
        }
        return carts;
    }
}



