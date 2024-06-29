package com.example.backend.exceptions;

import java.io.Serial;

public class BADException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public BADException() {
    }

    public BADException(String message) {
        super(message);
    }
}
