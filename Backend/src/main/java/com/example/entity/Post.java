package com.example.entity;

import java.util.Arrays;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "tblPost")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int postId;
	@Column(nullable = false)
	private String postTitle;
	@Column(nullable = false, length = 65535)
	private String postContent;

	@Column(nullable = false)

	private String postLastmodified;
	@Column(nullable = false)
	private String postCategory;
	@Column(nullable = false)
	private String postUser;

	@Lob
	@Column(length = 1048576,nullable = true)
	private byte[] postImage;

//	@ManyToOne
//	@JoinColumn(name = "category_Id")
//	private Category category;
//	
//	@ManyToOne
//	@JoinColumn(name = "user_Id")
//	private User user;

	public Post() {
		// TODO Auto-generated constructor stub
	}

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}

	public String getPostTitle() {
		return postTitle;
	}

	public void setPostTitle(String postTitle) {
		this.postTitle = postTitle;
	}

	public String getPostContent() {
		return postContent;
	}

	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}

	public String getPostLastmodified() {
		return postLastmodified;
	}

	public void setPostLastmodified(String postLastmodified) {
		this.postLastmodified = postLastmodified;
	}

	public String getPostCategory() {
		return postCategory;
	}

	public void setPostCategory(String postCategory) {
		this.postCategory = postCategory;
	}

	public String getPostUser() {
		return postUser;
	}

	public void setPostUser(String postUser) {
		this.postUser = postUser;
	}

	public byte[] getPostImage() {
		return postImage;
	}

	public void setPostImage(byte[] postImage) {
		this.postImage = postImage;
	}

	public Post(String postTitle, String postContent, String postLastmodified, String postCategory, String postUser,
			byte[] postImage) {
		super();

		this.postTitle = postTitle;
		this.postContent = postContent;
		this.postLastmodified = postLastmodified;
		this.postCategory = postCategory;
		this.postUser = postUser;
		this.postImage = postImage;
	}

	@Override
	public String toString() {
		return "Post [postId=" + postId + ", postTitle=" + postTitle + ", postContent=" + postContent
				+ ", postLastmodified=" + postLastmodified + ", postCategory=" + postCategory + ", postUser=" + postUser
				+ ", postImage=" + Arrays.toString(postImage) + "]";
	}

//	public Category getCategory() {
//		return category;
//	}

}
