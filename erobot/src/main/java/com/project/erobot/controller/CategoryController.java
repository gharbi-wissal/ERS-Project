package com.project.erobot.controller;

import com.project.erobot.entities.Category;
import com.project.erobot.exception.ResourceNotFoundException;
import com.project.erobot.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    @GetMapping("/")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable Long categoryId) {
        return categoryRepository.findById(categoryId)
    .orElseThrow(() -> new ResourceNotFoundException("Category", "id" ,categoryId));

    }
    @PostMapping("/")
    public Category addCategory(@Valid @RequestBody Category category) {
        return categoryRepository.save(category);
    }
    @PutMapping("/{categoryId}")
    public Category updateCategory(@PathVariable Long categoryId,@Valid @RequestBody Category category) {

        return categoryRepository.findById(categoryId)
                .map(cat -> {
                    cat.setName(category.getName());
                    return categoryRepository.save(cat);
                }).orElseThrow(() -> new ResourceNotFoundException("Category", "id" ,categoryId));
    }
    @DeleteMapping("/{categoryId}")
    public String deleteCategory(@PathVariable Long categoryId)  {

        return categoryRepository.findById(categoryId)
                .map(cat -> {
                    categoryRepository.delete(cat);
                    return ("\" Category deleted successfully \"");
                }).orElseThrow(() -> new ResourceNotFoundException("Category", "id" ,categoryId));
    }
}
