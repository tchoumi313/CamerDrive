package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreUserQuizResponse {
    private UserResponse user;
    private QuizResponse Quiz;
    private double note;
}
