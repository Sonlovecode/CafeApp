package com.example.cafeapp.controller;


import com.example.cafeapp.model.Category;
import com.example.cafeapp.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryRepository repo;
    public CategoryController(CategoryRepository repo){ this.repo = repo; }

    @GetMapping public List<Category> all(){ return repo.findAll(); }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @PostMapping public ResponseEntity<?> create(@RequestBody Category c){ repo.save(c); return ResponseEntity.ok(c); }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @DeleteMapping("/{id}") public ResponseEntity<?> del(@PathVariable Long id){ repo.deleteById(id); return ResponseEntity.ok().build(); }
}
