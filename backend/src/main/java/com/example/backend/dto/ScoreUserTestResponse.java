package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScoreUserTestResponse {
    private UserResponse user;
    private TestResponse test;
    private double note;
}
