package com.example.backend.services;

import com.example.backend.dto.PasswordRequest;
import com.example.backend.dto.UserRequest;
import com.example.backend.dto.UserResponse;
import com.example.backend.models.User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface UserService {

    List<UserResponse> index();

    UserResponse show(Long id);

    UserResponse create(UserRequest user);

    UserResponse update(UserRequest user, Long id);

    void delete(Long id);

    UserResponse modifyPassword(Long id, PasswordRequest request);

    UserResponse createProfile(Long id, MultipartFile profile);
}
