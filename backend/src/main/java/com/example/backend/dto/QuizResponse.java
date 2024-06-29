package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponse {
    private Long id;
    private String titre;
    private CoursResponse cours;
    private List<QuestionResponse> questions;
    private Timestamp createdAt;
    private Timestamp updatedat;
}
