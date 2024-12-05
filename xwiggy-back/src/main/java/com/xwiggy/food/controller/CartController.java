package com.xwiggy.food.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.xwiggy.food.dao.CartDaoImpl;
import com.xwiggy.food.model.Cart;
import com.xwiggy.food.model.NewCart;
@RestController
@CrossOrigin
public class CartController {

    @Autowired
    private CartDaoImpl cartDao;

    @PostMapping("/getTotal")
    public ResponseEntity<?> getTotal(@RequestBody Cart cart) {
        try {
            cart.setId(null);
            Cart savedCart = cartDao.save(cart);
            return ResponseEntity.ok(savedCart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/getCarts")
    public ResponseEntity<List<Cart>> getCarts(@RequestParam String userId) {
        try {
            List<Cart> carts = cartDao.findByUserId(userId);
            return ResponseEntity.ok(carts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @RequestMapping("/changeDB")
    public boolean changeDB(){
        cartDao.updateDB();
        return true;
    }

    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody Cart cart) {
        try {
            if (cart.getUserId() == null) {
                return ResponseEntity.badRequest().body("User ID is required");
            }
            Cart savedCart = cartDao.save(cart);
            return ResponseEntity.ok(savedCart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                               .body("Error adding to cart: " + e.getMessage());
        }
    }

    @PostMapping("/addNewItem")
    public boolean addNewItem(@RequestParam("file") MultipartFile file, @RequestParam("newFoodItem") String newFoodData) throws IOException {
        return cartDao.addNewItem(file,newFoodData);
    }


    @PostMapping("/addNewItemUrl")
    public boolean addNewItemByUrl(@RequestParam("newFoodItem") String newFoodData) throws IOException {
        return cartDao.addNewItemWithUrl(newFoodData);
    }

    @PostMapping("/checkItemId")
    public boolean checkItemId(@RequestBody String itemId, Model model){
        return !cartDao.itemIdAvailable(itemId);
    }

    private NewCart convertToNewCart(Cart cart) {
        NewCart newCart = new NewCart();
        newCart.setQuantity(cart.getQuantity1());
        newCart.setUserId(cart.getUserId());
        return newCart;
    }
}
