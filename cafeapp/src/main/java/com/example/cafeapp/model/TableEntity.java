package com.example.cafeapp.model;
import jakarta.persistence.*; import lombok.*;

@Entity @Table(name="cafe_tables")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class TableEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(unique=true) private Integer tableNumber;
    @Enumerated(EnumType.STRING) private TableStatus status = TableStatus.AVAILABLE;
    private Integer capacity = 4;
    public enum TableStatus { AVAILABLE, OCCUPIED, RESERVED, CLEANING }
}

