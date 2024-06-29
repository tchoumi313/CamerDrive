package com.example.backend.exceptions;

import lombok.NoArgsConstructor;

import java.io.Serial;

@NoArgsConstructor
public class NotFoundException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    String resourceName;
    String field;
    String fieldName;
    Long fieldId;

    String message;

    public NotFoundException(String resourceName, String field, String fieldName) {
        super(String.format("%s %s: %s n'a pas ete trouve !!!", resourceName, field, fieldName));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldName = fieldName;
    }

    public NotFoundException(String resourceName, String field, Long fieldId) {
        super(String.format("%s %s: %d n'a pas ete trouve !!!", resourceName, field, fieldId));
        this.resourceName = resourceName;
        this.field = field;
        this.fieldId = fieldId;
    }

//    public NotFoundException(String message){
//        super(message);
//    }
}
