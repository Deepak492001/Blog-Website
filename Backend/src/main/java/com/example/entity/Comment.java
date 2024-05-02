package com.example.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="tblComment")
public class Comment {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int commentId;

@Column(nullable = false,length = 1000)
private String content;

@Column(nullable = false,length = 200)
private String userEmail;

@Column(nullable = false)
private int postId;
public Comment() {
	// TODO Auto-generated constructor stub
}



public int getPostId() {
	return postId;
}



public void setPostId(int postId) {
	this.postId = postId;
}



public String getUserEmail() {
	return userEmail;
}


public void setUserEmail(String userEmail) {
	this.userEmail = userEmail;
}


public int getCommentId() {
	return commentId;
}
public void setCommentId(int commentId) {
	this.commentId = commentId;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}



@Override
public String toString() {
	return "Comment [commentId=" + commentId + ", content=" + content + ", userEmail=" + userEmail + ", postId="
			+ postId + "]";
}





}
