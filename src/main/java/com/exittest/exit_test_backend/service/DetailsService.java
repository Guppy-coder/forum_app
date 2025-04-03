package com.exittest.exit_test_backend.service;

import com.exittest.exit_test_backend.model.User;
import com.exittest.exit_test_backend.model.UserPrincipal;
import com.exittest.exit_test_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class DetailsService implements UserDetailsService {

    // Used for our custom Authentication provider

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username); // get user from database

        if (user == null) throw new UsernameNotFoundException("User not found");
        UserPrincipal userPrincipal = new UserPrincipal(user);
        return userPrincipal;
    }
}
