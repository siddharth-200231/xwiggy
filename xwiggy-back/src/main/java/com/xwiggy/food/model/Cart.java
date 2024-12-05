package com.xwiggy.food.model;

import javax.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String userId;
    @Column(columnDefinition = "integer default 0")
    private int quantity1;
    @Column(columnDefinition = "integer default 0")
    private int quantity2;
    @Column(columnDefinition = "integer default 0")
    private int quantity3;
    @Column(columnDefinition = "integer default 0")
    private int quantity4;
    @Column(columnDefinition = "integer default 0")
    private int quantity5;
    @Column(columnDefinition = "integer default 0")
    private int quantity6;

    public Cart(){}

    public Cart(String userId) {
        this.userId = userId;
        this.quantity1 = 0;
        this.quantity2 = 0;
        this.quantity3 = 0;
        this.quantity4 = 0;
        this.quantity5 = 0;
        this.quantity6 = 0;
    }

    public Cart(Long id, int q1, int q2, int q3, int q4, int q5) {
        this.id = id;
        this.quantity1 = q1;
        this.quantity2 = q2;
        this.quantity3 = q3;
        this.quantity4 = q4;
        this.quantity5 = q5;
        this.quantity6 = 0;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuantity1(int quantity1) {
        this.quantity1 = quantity1;
    }

    public void setQuantity2(int quantity2) {
        this.quantity2 = quantity2;
    }

    public void setQuantity3(int quantity3) {
        this.quantity3 = quantity3;
    }

    public void setQuantity4(int quantity4) {
        this.quantity4 = quantity4;
    }

    public void setQuantity5(int quantity5) {
        this.quantity5 = quantity5;
    }

    public int getQuantity1() { 
        return quantity1; 
    }

    public int getQuantity2() { 
        return quantity2; 
    }

    public int getQuantity3() {
        return quantity3;
    }

    public void setQuantity6(int quantity6) {
        this.quantity6 = quantity6;
    }

    public int getQuantity6() {
        return quantity6;
    }

    public int getQuantity4() { return quantity4; }
    public int getQuantity5() { return quantity5; }

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                '}';
    }
}
