package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConceptRequest {
    private String titre;
    private String contenu;
    private CoursResponse cours;
}
