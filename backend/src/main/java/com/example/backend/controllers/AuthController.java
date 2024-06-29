package com.example.backend.controllers;

import com.example.backend.dto.SignInRequest;
import com.example.backend.dto.SignInResponse;
import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import com.example.backend.security.JWTUtil;
import com.example.backend.services.UserService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody UserRequest user) {
        return userService.create(user);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public SignInResponse login(@Valid @RequestBody SignInRequest request) {

        UsernamePasswordAuthenticationToken authCredentials = new UsernamePasswordAuthenticationToken(
                request.getUsername(), request.getPassword());

        authenticationManager.authenticate(authCredentials);

        String token = jwtUtil.generateToken(request.getUsername());

        User user = userRepository.findByEmailOrUsername(request.getUsername(), request.getUsername()).orElseThrow(() -> new NotFoundException("L'User", "de Username", request.getUsername()));
        UserResponse userResponse = modelMapper.map(user, UserResponse.class);

        return new SignInResponse(userResponse, token);
    }
}