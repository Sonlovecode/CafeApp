package com.example.cafeapp.controller;

import com.example.cafeapp.model.User;
import com.example.cafeapp.model.UserRole;
import com.example.cafeapp.repository.UserRepository;
import com.example.cafeapp.security.JwtUtils;
import lombok.Data;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtils jwt;

    public AuthController(UserRepository userRepo, PasswordEncoder encoder, JwtUtils jwt) {
        this.userRepo = userRepo;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto dto) {
        if (userRepo.findByUsername(dto.getUsername()).isPresent())
            return ResponseEntity.badRequest().body(Map.of("error", "username exists"));
        User u = User.builder()
                .username(dto.getUsername())
                .password(encoder.encode(dto.getPassword()))
                .role(UserRole.USER)
                .build();
        userRepo.save(u);
        return ResponseEntity.ok(Map.of("msg", "registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto dto) {
        var opt = userRepo.findByUsername(dto.getUsername());
        if (opt.isEmpty())
            return ResponseEntity.status(401).body(Map.of("error", "bad credentials"));
        var u = opt.get();
        if (!encoder.matches(dto.getPassword(), u.getPassword()))
            return ResponseEntity.status(401).body(Map.of("error", "bad credentials"));
        String token = jwt.generateToken(u.getUsername(), u.getRole().name());
        return ResponseEntity.ok(Map.of("token", token, "role", u.getRole().name(), "username", u.getUsername()));
    }

    // ✅ API mới: lấy danh sách tất cả user
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userRepo.findAll());
    }

    @Data
    static class RegisterDto {
        private String username;
        private String password;
    }

    @Data
    static class LoginDto {
        private String username;
        private String password;
    }
}
