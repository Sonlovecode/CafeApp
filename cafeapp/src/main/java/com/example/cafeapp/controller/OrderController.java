package com.example.cafeapp.controller;


import com.example.cafeapp.model.*;
import com.example.cafeapp.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orderRepo; private final MenuItemRepository menuRepo;
    private final TableRepository tableRepo; private final UserRepository userRepo;

    public OrderController(OrderRepository orderRepo, MenuItemRepository menuRepo, TableRepository tableRepo, UserRepository userRepo){
        this.orderRepo = orderRepo; this.menuRepo = menuRepo; this.tableRepo = tableRepo; this.userRepo = userRepo;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateOrderDto dto, Authentication auth){
        var tableOpt = tableRepo.findById(dto.tableId);
        if (tableOpt.isEmpty()) return ResponseEntity.badRequest().body(Map.of("error","Table not found"));
        Order order = new Order();
        order.setTable(tableOpt.get());
        if (dto.username != null) userRepo.findByUsername(dto.username).ifPresent(order::setUser);
        List<OrderItem> items = new ArrayList<>(); BigDecimal total = BigDecimal.ZERO;
        for (var it : dto.items){
            var mi = menuRepo.findById(it.menuItemId).orElse(null);
            if (mi==null) continue;
            OrderItem oi = OrderItem.builder().menuItem(mi).quantity(it.quantity).price(mi.getPrice().multiply(BigDecimal.valueOf(it.quantity))).order(order).build();
            items.add(oi); total = total.add(oi.getPrice());
        }
        order.setItems(items); order.setTotalAmount(total); order.setStatus("PENDING"); orderRepo.save(order);
        var t = tableOpt.get(); t.setStatus(TableEntity.TableStatus.OCCUPIED); tableRepo.save(t);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{id}") public ResponseEntity<?> get(@PathVariable Long id){ return orderRepo.findById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build()); }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @PutMapping("/{id}/status") public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String,String> body){
        String status = body.get("status");
        return orderRepo.findById(id).map(o -> {
            o.setStatus(status); orderRepo.save(o);
            if ("COMPLETED".equals(status)){
                var t = o.getTable(); if (t!=null){ t.setStatus(TableEntity.TableStatus.AVAILABLE); tableRepo.save(t); }
            }
            return ResponseEntity.ok(o);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    public static class CreateOrderDto { public Long tableId; public String username; public List<Item> items; public static class Item { public Long menuItemId; public Integer quantity; } }
}
