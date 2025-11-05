package com.example.cafeapp.repository;

import com.example.cafeapp.model.TableEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TableRepository extends JpaRepository<TableEntity, Long> {

    // Tìm bàn theo số bàn
    Optional<TableEntity> findByTableNumber(Integer tableNumber);

    // Lấy danh sách bàn theo trạng thái
    List<TableEntity> findByStatus(TableEntity.TableStatus status);

    // 🔢 Đếm số lượng bàn theo trạng thái
    long countByStatus(TableEntity.TableStatus status);
}
