package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConceptResponse {
    private Long id;
    private String titre;
    private String contenu;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
