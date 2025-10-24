package com.example.cafeapp.controller;


import com.example.cafeapp.model.MenuItem;
import com.example.cafeapp.repository.MenuItemRepository;
import com.example.cafeapp.repository.CategoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {
    private final MenuItemRepository menuRepo;
    private final CategoryRepository catRepo;
    public MenuController(MenuItemRepository menuRepo, CategoryRepository catRepo){ this.menuRepo = menuRepo; this.catRepo = catRepo; }

    @GetMapping public List<MenuItem> all(){ return menuRepo.findAll(); }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @PostMapping public ResponseEntity<?> create(@RequestBody MenuItem m){
        if (m.getCategory() != null && m.getCategory().getId()!=null) catRepo.findById(m.getCategory().getId()).ifPresent(m::setCategory);
        menuRepo.save(m); return ResponseEntity.ok(m);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @PutMapping("/{id}") public ResponseEntity<?> update(@PathVariable Long id, @RequestBody MenuItem in){
        return menuRepo.findById(id).map(m -> {
            m.setName(in.getName()); m.setPrice(in.getPrice()); m.setAvailable(in.isAvailable());
            if (in.getCategory()!=null && in.getCategory().getId()!=null) catRepo.findById(in.getCategory().getId()).ifPresent(m::setCategory);
            menuRepo.save(m); return ResponseEntity.ok(m);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @DeleteMapping("/{id}") public ResponseEntity<?> del(@PathVariable Long id){ menuRepo.deleteById(id); return ResponseEntity.ok().build(); }
}
