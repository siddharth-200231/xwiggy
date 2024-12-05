package com.xwiggy.food.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xwiggy.food.model.Contact;
@Repository
public interface ContactDao extends JpaRepository<Contact,Integer> {
}
