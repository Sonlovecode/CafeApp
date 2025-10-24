package com.example.cafeapp;

import com.example.cafeapp.model.User;
import com.example.cafeapp.model.UserRole;
import com.example.cafeapp.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CafeappApplication {

	public static void main(String[] args) {
		SpringApplication.run(CafeappApplication.class, args);
	}

	@Bean
	CommandLineRunner init(UserRepository userRepository) {
		return args -> {
			BCryptPasswordEncoder enc = new BCryptPasswordEncoder();

			if (userRepository.findByUsername("root").isEmpty()) {
				User root = User.builder()
						.username("root")
						.password(enc.encode("rootpass"))
						.role(UserRole.ROOT)
						.build();
				userRepository.save(root);
			}

			if (userRepository.findByUsername("admin").isEmpty()) {
				User admin = User.builder()
						.username("admin")
						.password(enc.encode("adminpass"))
						.role(UserRole.ADMIN)
						.build();
				userRepository.save(admin);
			}
		};
	}
}
