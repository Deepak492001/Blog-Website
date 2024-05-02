package com.example.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "tblUsers")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	@Column(length = 60, nullable = false)
	private String name;
	@Column(nullable = false)
	private String email;
	@Column(nullable = false)
	private String password;
	@Transient
	@Column(nullable = false)
	private String confirmPassowrd;

	@OneToMany(mappedBy = "postUser", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Post> posts = new HashSet<>();

	public String getConfirmPassowrd() {
		return confirmPassowrd;
	}

	public User() {
		// TODO Auto-generated constructor stub
	}
	public User(String email) {
		// TODO Auto-generated constructor stub
		this.email=email;
	}
	
	public void setConfirmPassowrd(String confirmPassowrd) {
		this.confirmPassowrd = confirmPassowrd;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userID) {
		this.userId = userID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User(String name, String email, String password) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
	}

	@Override
	public String toString() {
		return "User [userID=" + userId + ", name=" + name + ", email=" + email + ", password=" + password + "]";
	}

}
