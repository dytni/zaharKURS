package by.zahar.cursaxh.model.dto;

import by.zahar.cursaxh.model.enums.Role;

import java.util.Set;

// UserDTO.java
public class UserDTO {
    private String username;
    private String password; // Добавьте это поле
    private Set<Role> roles;

    // Конструктор
    public UserDTO(String username, String password, Set<Role> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public UserDTO() {
    }

    // Геттеры и сеттеры
    public String getUsername() { return username; }
    public String getPassword() { return password; } // Добавьте этот геттер
    public Set<Role> getRoles() { return roles; }

    // Сеттеры, если нужны
    public void setUsername(String username) { this.username = username; }
    public void setPassword(String password) { this.password = password; }
    public void setRoles(Set<Role> roles) { this.roles = roles; }
}