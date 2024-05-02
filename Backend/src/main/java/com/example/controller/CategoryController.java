package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Category;
import com.example.repositary.CategoryRepository;

@RestController
//@CrossOrigin("http://localhost:5173")
@CrossOrigin("*")
public class CategoryController {
	@Autowired
	private CategoryRepository categoryRepository;

	@GetMapping("/all-categories")
	public ResponseEntity<List<Category>> getAllCategories() {
		List<Category> categories = this.categoryRepository.findAll();
		return ResponseEntity.ok(categories);
	}

}
