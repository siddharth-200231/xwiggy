package com.xwiggy.food.model;

public class NewCart {

    private int quantity;
    private String userId;

    public NewCart(){}

    public NewCart(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "NewCart{" +
                "quantity=" + quantity +
                '}';
    }
}
