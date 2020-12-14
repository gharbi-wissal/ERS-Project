package com.project.erobot.controller;

import com.project.erobot.entities.Product;
import com.project.erobot.exception.ResourceNotFoundException;
import com.project.erobot.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/")
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }
    @GetMapping("/{productId}")
    public Product getProduct(@PathVariable Long productId) {
        return productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product", "id" ,productId));

    }
    @PostMapping("/")
    public Product addProduct(@Valid @RequestBody Product product) {

        return productRepository.save(product);
    }
    @PutMapping("/{productId}")
    public Product updateProduct(@PathVariable Long productId,@Valid @RequestBody Product product) {

        return productRepository.findById(productId)
                .map(prod -> {
                    prod.setProductName(product.getProductName());
                    prod.setCategory(product.getCategory());
                    prod.setPrice(product.getPrice());
                    return productRepository.save(prod);
                }).orElseThrow(() -> new ResourceNotFoundException("Product", "id" ,productId));
    }
    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable Long productId)  {

        return productRepository.findById(productId)
                .map(cat -> {
                    productRepository.delete(cat);
                    return ("\" Product deleted successfully \"");

                }).orElseThrow(() -> new ResourceNotFoundException("Product", "id" ,productId));
    }
}
