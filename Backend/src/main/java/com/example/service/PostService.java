package com.example.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.entity.Post;
import com.example.entity.User;
import com.example.repositary.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class PostService {
	@Autowired
	private PostRepository postRepositary;

	public Post savePostData(String postTitle, String postContent, String postCategory, String postUser,
			MultipartFile file) throws IOException {
		byte[] imageData = null;

		if (file != null) {
			imageData = file.getBytes();
		}

		LocalDateTime myDateObj = LocalDateTime.now();
		DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
		String formattedDate = myDateObj.format(myFormatObj);

		Post p = new Post(postTitle, postContent, formattedDate, postCategory, postUser, imageData);

		return this.postRepositary.save(p);
	}

	public List<Post> getAllPostsByUser(User user) {
		return this.postRepositary.findByPostUser(user);
	}


	public List<Post> getAllPosts() {
		return this.postRepositary.findALL();
	}

//	public List<Post> getAllPosts(int pageNumber, int pageSize) {
//
//		Pageable pageable = PageRequest.of(pageNumber, pageSize);
//
//		Page<Post> pagePost = this.postRepositary.findAll(pageable);
//
//		return pagePost.getContent();
//	}

	public Post getPostById(int postId) {
		return this.postRepositary.findById(postId);
	}

	public Post updatePost(int postId, String postTitle, String postContent, String postCategory, String postUser,
			MultipartFile file) throws IOException {
		byte[] imageData=null;

		if (file != null) {
			imageData = file.getBytes();
		}
	
		LocalDateTime myDateObj = LocalDateTime.now();
		DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
		String formattedDate = myDateObj.format(myFormatObj);
System.out.println(postContent);
		Post previousPost = this.postRepositary.findById(postId);
		
		if(imageData!=null) {
			previousPost.setPostImage(imageData);
		}

		previousPost.setPostCategory(postCategory);
		previousPost.setPostUser(postUser);
		previousPost.setPostContent(postContent);
		previousPost.setPostLastmodified(formattedDate);
		previousPost.setPostTitle(postTitle);
	

		return this.postRepositary.save(previousPost);

	}

}
