package com.exittest.exit_test_backend.api;


import com.exittest.exit_test_backend.dto.AuthResponseDto;
import com.exittest.exit_test_backend.dto.LoginRequestDto;
import com.exittest.exit_test_backend.dto.RegistrationDto;
import com.exittest.exit_test_backend.model.User;
import com.exittest.exit_test_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.*;
//import org.springframework.security.crypto.password.PasswordEncoder;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

//    @Autowired
//    PasswordEncoder passwordEncoder;

//    @Autowired
//    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationDto user){

        if (userService.findByEmail(user.getEmail()).isPresent()){
            return ResponseEntity.badRequest().body("User Already exists");
        }
        userService.registerUser(user);
        return ResponseEntity.ok("User Registered");
    }

    @GetMapping("/users")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @Deprecated // csrf is disabled in security filter chain
    @GetMapping("/csrf-token")
    public CsrfToken getCsrfToken(HttpServletRequest request){
        return (CsrfToken) request.getAttribute("_csrf");
    }

    @PostMapping("/login")
    private ResponseEntity<?> authenticateUser(@RequestBody LoginRequestDto loginRequest){
        Optional<User> userOpt = userService.findByEmail(loginRequest.getUsername());
        if(userOpt.isEmpty()){
           return ResponseEntity.badRequest().body("Invalid Credentials");
        }
        String token = "sdfghjkl;lkijuhygtfds";

        return ResponseEntity.ok(new AuthResponseDto(token));
    }
}
