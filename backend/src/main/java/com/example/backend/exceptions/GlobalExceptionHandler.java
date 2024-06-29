package com.example.backend.exceptions;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.naming.SizeLimitExceededException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<HandlingException> myNotFoundException(NotFoundException e) {
        String message = e.getMessage();
        Timestamp timestamp = new Timestamp(new Date().getTime());

        HandlingException res = new HandlingException(timestamp, message, false);

        return new ResponseEntity<>(res, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(BADException.class)
    public ResponseEntity<HandlingException> myBADException(BADException e) {
        String message = e.getMessage();
        Timestamp timestamp = new Timestamp(new Date().getTime());

        HandlingException res = new HandlingException(timestamp, message, false);

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<HandlingException> myAuthenticationException(AuthenticationException e) {
        String message = e.getMessage();
        Timestamp timestamp = new Timestamp(new Date().getTime());

        HandlingException res = new HandlingException(timestamp, message, false);

        return new ResponseEntity<>(res, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(SizeLimitExceededException.class)
    public ResponseEntity<HandlingException> myBADException(SizeLimitExceededException e) {
        String message = e.getMessage();
        Timestamp timestamp = new Timestamp(new Date().getTime());

        HandlingException res = new HandlingException(timestamp, message, false);

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> myMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> res = new HashMap<>();

        e.getBindingResult().getAllErrors().forEach(err -> {
            String fieldName = ((FieldError) err).getField();
            String message = err.getDefaultMessage();

            res.put(fieldName, message);
        });

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> myConstraintsVoilationException(ConstraintViolationException e) {
        Map<String, String> res = new HashMap<>();

        e.getConstraintViolations().forEach(violation -> {
            String fieldName = violation.getPropertyPath().toString();
            String message = violation.getMessage();

            res.put(fieldName, message);
        });

        return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<HandlingException> myNullPointerException(NullPointerException e) {
        Timestamp timestamp = new Timestamp(new Date().getTime());
        HandlingException res = new HandlingException(timestamp, e.getMessage(), false);

        return new ResponseEntity<>(res, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}