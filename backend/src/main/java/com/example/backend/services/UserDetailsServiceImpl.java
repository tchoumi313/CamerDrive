package com.example.backend.services;

import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByEmailOrUsername(username, username);

        return user.map(UserDetailsImpl::new).orElseThrow(() -> new NotFoundException("L'Utilisateur", "de username", username));
    }

}
