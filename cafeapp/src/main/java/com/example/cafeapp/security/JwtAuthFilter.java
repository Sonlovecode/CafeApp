package com.example.cafeapp.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;

    public JwtAuthFilter(JwtUtils jwtUtils) {
        this.jwtUtils = jwtUtils;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        // ❌ Nếu không có token thì bỏ qua, để tiếp tục các filter khác
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        try {
            // ✅ Giải mã token
            Claims claims = jwtUtils.parse(token).getBody();

            String username = claims.getSubject();
            String role = claims.get("role", String.class);

            if (username != null && role != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // ✅ Thêm prefix ROLE_ để Spring Security hiểu đúng quyền
                var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);

                // ✅ Đặt thông tin xác thực vào SecurityContext
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        } catch (Exception e) {
            System.out.println("⚠️ Token không hợp lệ hoặc hết hạn: " + e.getMessage());
            // Không ném lỗi 403 ở đây, để request tiếp tục -> Security sẽ chặn nếu cần
        }

        filterChain.doFilter(request, response);
    }
}
