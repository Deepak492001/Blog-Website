package com.example.exception;

public class PostNotFoundByUserException extends RuntimeException {
	  public PostNotFoundByUserException(String message) {
	        super(message);
	    }
}
