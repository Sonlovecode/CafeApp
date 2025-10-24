package com.example.cafeapp.repository;

import com.example.cafeapp.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCreatedAtBetweenAndStatus(LocalDateTime from, LocalDateTime to, String status);
}