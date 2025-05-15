package com.example.productos.service;

import com.example.productos.model.Product;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class ProductServiceImpl implements ProductService {
    private final Firestore firestore;
    private final String COLLECTION_NAME = "products";

    @Autowired
    public ProductServiceImpl(Firestore firestore) {
        this.firestore = firestore;
    }

    @Override
    public List<Product> getAllProducts() throws ExecutionException, InterruptedException {
        List<Product> productList = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = firestore.collection(COLLECTION_NAME).get();
        
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            Product product = document.toObject(Product.class);
            product.setId(document.getId());
            productList.add(product);
        }
        
        return productList;
    }

    @Override
    public Product getProductById(String id) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            Product product = document.toObject(Product.class);
            product.setId(document.getId());
            return product;
        } else {
            return null;
        }
    }

    @Override
    public Product saveProduct(Product product) throws ExecutionException, InterruptedException {
        if (product.getId() == null || product.getId().isEmpty()) {
            product.setId(UUID.randomUUID().toString());
        }
        
        ApiFuture<WriteResult> future = firestore.collection(COLLECTION_NAME).document(product.getId()).set(product);
        future.get();
        return product;
    }

    @Override
    public Product updateProduct(String id, Product product) throws ExecutionException, InterruptedException {
        DocumentReference docRef = firestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        
        if (document.exists()) {
            product.setId(id);
            ApiFuture<WriteResult> updateFuture = docRef.set(product);
            updateFuture.get();
            return product;
        } else {
            return null;
        }
    }

    @Override
    public void deleteProduct(String id) {
        firestore.collection(COLLECTION_NAME).document(id).delete();
    }
}
