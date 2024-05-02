package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.User;
import com.example.service.UserService;

@RestController
@CrossOrigin("*")
public class AuthenticationController {
	@Autowired
	private UserService userService;
	@PostMapping("/validate-user")
	public ResponseEntity<String> checkUserSignInDetails(@RequestBody User user) {
	    String response = this.userService.checkSignInDetails(user);
	    return ResponseEntity.ok(response);
	}

	@PostMapping("/check-user")
	public ResponseEntity<Boolean> checkUserExistsWithEmail(@RequestBody String email) {
	    boolean userExists = this.userService.checkUserByEmail(email);
	    return ResponseEntity.ok(userExists);
	}

	 

}
