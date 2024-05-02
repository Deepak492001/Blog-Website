package com.example.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;


import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ControllerAdvice;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PostNotFoundByPostIdException.class)
    public ResponseEntity<String> handlePostNotFoundException(PostNotFoundByPostIdException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(e.getMessage());
    }

    @ExceptionHandler(PostNotFoundByUserException.class)
    public ResponseEntity<String> handlePostOperationException(PostNotFoundByUserException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(e.getMessage());
    }

    // Add more exception handlers for other exceptions

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Internal Server Error: " + e.getMessage());
    }
}
