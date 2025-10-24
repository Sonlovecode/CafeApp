package com.example.cafeapp.model;

import jakarta.persistence.*; import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity @Table(name="orders")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Order {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne private TableEntity table;
    @ManyToOne private User user;
    private BigDecimal totalAmount = BigDecimal.ZERO;
    private String status = "PENDING"; // PENDING, CONFIRMED, COMPLETED, CANCELLED
    private LocalDateTime createdAt = LocalDateTime.now();
    @OneToMany(mappedBy="order", cascade=CascadeType.ALL, orphanRemoval = true) private List<OrderItem> items;
}
