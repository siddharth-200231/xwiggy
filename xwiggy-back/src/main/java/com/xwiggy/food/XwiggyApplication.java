package com.xwiggy.food;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.xwiggy.food.dao")
@ComponentScan(basePackages = "com.xwiggy.food")
public class XwiggyApplication {

    public static void main(String[] args) {
        SpringApplication.run(XwiggyApplication.class, args);
    }

}
