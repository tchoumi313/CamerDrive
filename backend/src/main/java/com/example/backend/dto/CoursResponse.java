package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoursResponse {
    private Long id;
    private String titre;
    private String description;
    private FichierResponse image;
    private List<ConceptResponse> concepts;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
