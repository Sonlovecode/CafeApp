package com.example.cafeapp.controller;

import com.example.cafeapp.model.TableEntity;
import com.example.cafeapp.repository.TableRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tables")
public class TableController {
    private final TableRepository repo;
    public TableController(TableRepository repo){ this.repo = repo; }

    @GetMapping public List<TableEntity> all(){ return repo.findAll(); }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @PostMapping public ResponseEntity<?> create(@RequestBody TableEntity t){ repo.save(t); return ResponseEntity.ok(t); }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @PutMapping("/{id}/status") public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody StatusDto dto){
        return repo.findById(id).map(t -> { t.setStatus(TableEntity.TableStatus.valueOf(dto.status)); repo.save(t); return ResponseEntity.ok(t); }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    static class StatusDto { public String status; }
}
