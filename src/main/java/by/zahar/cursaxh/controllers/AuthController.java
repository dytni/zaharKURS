package by.zahar.cursaxh.controllers;

import by.zahar.cursaxh.model.dto.UserDTO;
import by.zahar.cursaxh.model.entity.User;
import by.zahar.cursaxh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

// AuthController.java
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class AuthController {
    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // Добавьте это поле

    // AuthController.java
    @PostMapping("/api/register")
    public ResponseEntity<User> register(@RequestBody UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRoles(userDTO.getRoles()); // ← Убедитесь, что это есть

        if (userRepo.existsByUsername(user.getUsername())) {
            throw new RuntimeException("Username занят");
        }
        return ResponseEntity.status(201).body(userRepo.save(user));
    }
    @PostMapping("/api/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO request) {
        User user = userRepo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Неверный пароль");
        }

        return ResponseEntity.ok(new UserDTO(user.getUsername(),user.getPassword(), user.getRoles()));
    }

}