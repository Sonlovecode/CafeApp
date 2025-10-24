package com.example.cafeapp.controller;

import com.example.cafeapp.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final OrderRepository orderRepo;
    public ReportController(OrderRepository orderRepo){ this.orderRepo = orderRepo; }

    @PreAuthorize("hasRole('ADMIN') or hasRole('ROOT')")
    @GetMapping("/daily")
    public ResponseEntity<?> daily(@RequestParam(required = false) String date) {
        LocalDate d = date == null ? LocalDate.now() : LocalDate.parse(date);
        LocalDateTime from = d.atStartOfDay(); LocalDateTime to = d.atTime(23,59,59);
        var orders = orderRepo.findByCreatedAtBetweenAndStatus(from, to, "COMPLETED");
        var total = orders.stream().map(o -> o.getTotalAmount()).reduce(java.math.BigDecimal.ZERO, java.math.BigDecimal::add);
        return ResponseEntity.ok(Map.of("date", d.toString(), "totalRevenue", total, "totalOrders", orders.size()));
    }
}
