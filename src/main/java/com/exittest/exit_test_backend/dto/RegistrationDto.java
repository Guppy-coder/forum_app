package com.exittest.exit_test_backend.dto;

import com.exittest.exit_test_backend.enums.Roles;
import org.springframework.stereotype.Component;

@Component
public class RegistrationDto {
    private String username;
    private String password;
    private String email;
    private String role;

    // getters and setters


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}