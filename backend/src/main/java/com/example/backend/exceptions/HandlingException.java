package com.example.backend.exceptions;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HandlingException {
    private Timestamp timestamp;
    private String message;
    private boolean status;

}
