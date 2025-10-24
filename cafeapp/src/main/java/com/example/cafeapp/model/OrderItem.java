package com.example.cafeapp.model;
import jakarta.persistence.*; import lombok.*;
import java.math.BigDecimal;

@Entity @Table(name="order_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class OrderItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne @JoinColumn(name="order_id") private Order order;
    @ManyToOne private MenuItem menuItem;
    private Integer quantity;
    private BigDecimal price;
}
