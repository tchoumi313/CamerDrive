package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreUserQuizRequest {
    private UserResponse user;
    private QuizResponse quiz;
    private double note;
}
