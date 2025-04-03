package com.exittest.exit_test_backend.dto;


public class LoginRequestDto {

    private String username;
    private String password;

    public String getUsername() {
        return username;
    }

    public void setEmail(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
