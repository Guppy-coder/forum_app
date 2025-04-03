package com.exittest.exit_test_backend.service;

import com.exittest.exit_test_backend.dto.RegistrationDto;
import com.exittest.exit_test_backend.enums.Roles;
import com.exittest.exit_test_backend.model.User;
import com.exittest.exit_test_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(RegistrationDto userDto) {
        if (userDto.getEmail() == null || userDto.getEmail().isEmpty()) {
            throw new IllegalArgumentException("Email cannot be null or empty");
        }


        User user = new User();
        user.setEmail(userDto.getEmail());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        if (userDto.getRole().equalsIgnoreCase("Admin")){
            user.setRole(Roles.ADMIN);
        }else {
            user.setRole(Roles.USER);
        }
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getUsers(){
        return (List<User>) userRepository.findAll();
    }
}

