package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.example.entity.User;
import com.example.repositary.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserService {
	@Autowired
	private UserRepository userRepositary;

	public User saveUser(User user) {
		return this.userRepositary.save(user);
	}

	public User getUserById(int userId) {
		return this.userRepositary.findByUserId(userId);
	}
	public User getUserByEmail(String email) {
		return this.userRepositary.findByEmail(email);
	}

	public String checkSignInDetails(User user) {
//	    if (this.userRepositary.existsByEmail(user.getEmail())) {
	        User u = this.userRepositary.findByEmail(user.getEmail());
	        if(u!=null) {
		        if (u.getPassword().equals(user.getPassword())) {
		            return "Welcome Password matched Successfully";
		        } else {
		            return "Passwords do not match";
		        }
		        
	        }else {
	        	  return "User not found";
	        }


	}
	
	public boolean checkUserByEmail(String email) {
		User user= this.userRepositary.findByEmail(email);
		System.out.println(user);
		return user==null? false :true;
		
	}
	
//	public Comment deleteComment(int postId) {
//		return this.userRepositary.deleteById(postId);
//	}


}
