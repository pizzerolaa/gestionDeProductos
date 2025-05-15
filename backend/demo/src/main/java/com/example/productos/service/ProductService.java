package com.example.productos.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.example.productos.model.Product;

public interface ProductService {
    List<Product> getAllProducts() throws ExecutionException, InterruptedException;
    Product getProductById(String id) throws ExecutionException, InterruptedException;
    Product saveProduct(Product product) throws ExecutionException, InterruptedException;
    Product updateProduct(String id, Product product) throws ExecutionException, InterruptedException;
    void deleteProduct(String id);
}