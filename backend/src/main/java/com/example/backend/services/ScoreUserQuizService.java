package com.example.backend.services;

import com.example.backend.dto.ScoreUserQuizRequest;
import com.example.backend.dto.ScoreUserQuizResponse;
import com.example.backend.dto.UserResponse;
import com.example.backend.models.ScoreUserQuiz;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ScoreUserQuizService {

    public ScoreUserQuizResponse createUserQuiz(ScoreUserQuizRequest userQuiz);

    public List<UserResponse> getUserByQuizId(Long quizId);

    ScoreUserQuiz getUserQuizById(Long id);

    public ScoreUserQuizResponse updateUserQuiz(Long id, ScoreUserQuizRequest updatedUserAnswer);

    public void deleteUserQuiz(Long id);

    public List<ScoreUserQuizResponse> getAllUserQuiz();
}
