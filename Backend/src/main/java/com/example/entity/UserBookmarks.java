package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblUserBookMark")
public class UserBookmarks {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private int bookmarkId;
  @Column(length = 100,nullable = false)
 private String userEmail;
  @Column(nullable = false)
 private int postId;

  public UserBookmarks() {
	// TODO Auto-generated constructor stub
}
  

public int getBookmarkId() {
	return bookmarkId;
}
public void setBookmarkId(int bookmarkId) {
	this.bookmarkId = bookmarkId;
}
public String getUserEmail() {
	return userEmail;
}
public void setUserEmail(String userEmail) {
	this.userEmail = userEmail;
}
public int getPostId() {
	return postId;
}
public void setPostId(int postId) {
	this.postId = postId;
}

@Override
public String toString() {
	return "UserBookmarks [bookmarkId=" + bookmarkId + ", userEmail=" + userEmail + ", postId=" + postId;
//			 ", bookmarkStatus=" + bookmarkStatus + "]";
}


  
 
}
