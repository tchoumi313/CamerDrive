package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionResponse {
    private Long id;
    private String libelle;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctOption;
    private FichierResponse image;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
