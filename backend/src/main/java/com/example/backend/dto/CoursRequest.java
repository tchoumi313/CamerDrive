package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CoursRequest {
    private String titre;
    private String description;
//    private FichierResponse image;
    private MultipartFile fichier;
//    private List<ConceptResponse> concepts;
}
