package com.example.backend.exceptions;

public class UnsupportedFileTypeException extends RuntimeException {
	public UnsupportedFileTypeException(String message) {
		super(message);
	}
}
