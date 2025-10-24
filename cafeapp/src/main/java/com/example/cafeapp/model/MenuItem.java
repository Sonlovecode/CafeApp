package com.example.cafeapp.model;

import jakarta.persistence.*; import lombok.*;
import java.math.BigDecimal;
@Entity @Table(name="menu_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class MenuItem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    private String name;
    private BigDecimal price;
    private String imageUrl;
    private boolean available = true;
    @ManyToOne @JoinColumn(name="category_id") private Category category;
}
