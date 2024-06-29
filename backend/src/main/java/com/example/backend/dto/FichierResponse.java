package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FichierResponse {
    private Long id;
    private String url;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
