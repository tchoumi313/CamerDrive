package com.example.backend.services;

import com.example.backend.dto.ScoreUserTestRequest;
import com.example.backend.dto.ScoreUserTestResponse;
import com.example.backend.dto.UserResponse;
import com.example.backend.models.ScoreUserTest;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ScoreUserTestService {

    public ScoreUserTestResponse createUserTest(ScoreUserTestRequest userTest);

    public List<UserResponse> getUserByTestId(Long testId);

    ScoreUserTest getUserTestById(Long id);

    public ScoreUserTestResponse updateUserTest(Long id, ScoreUserTestRequest updatedUserAnswer);

    public void deleteUserTest(Long id);

    public List<ScoreUserTestResponse> getAllUserTest();
}
