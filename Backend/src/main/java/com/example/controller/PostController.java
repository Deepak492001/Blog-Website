package com.example.controller;

import java.io.IOException;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.example.entity.Post;
import com.example.exception.PostNotFoundByPostIdException;
import com.example.exception.PostNotFoundByUserException;
import com.example.repositary.PostRepository;
import com.example.service.PostService;



@RestController
@CrossOrigin("*")
//@CrossOrigin("http://localhost:5173")
public class PostController {

	@Autowired
	private PostService postService;
	@Autowired
	private PostRepository postRepositary;

	@PostMapping("/add-post")
	public ResponseEntity<?> addPost(
	    @RequestParam("postTitle") String postTitle,
	    @RequestParam("postContent") String postContent,
	    @RequestParam("postCategory") String postCategory,
	    @RequestParam("postUser") String postUser,
	    @RequestParam(name = "postImage", required = false) MultipartFile file) {

	    try {
	        Post savedPost = this.postService.savePostData(postTitle, postContent, postCategory, postUser, file);
	        return ResponseEntity.ok(savedPost);
	    } catch (IOException e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body("Error saving post: " + e.getMessage());
	    }
	}

	@GetMapping("/posts")
	public ResponseEntity<List<Post>> getPosts() {

		List<Post> posts = this.postService.getAllPosts();
		return ResponseEntity.ok(posts);
	}

	@DeleteMapping("/delete-post/{postId}")
	public ResponseEntity<?> deletePost(@PathVariable("postId") int postId) {
		this.postRepositary.deleteById(postId);
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/update-post/{postId}")
	public ResponseEntity<?> updatePostById(@PathVariable("postId") int postId ,@RequestParam("postTitle") String postTitle,
		    @RequestParam("postContent") String postContent,
		    @RequestParam("postCategory") String postCategory,
		    @RequestParam("postUser") String postUser,
		    @RequestParam(name = "postImage", required = false) MultipartFile file) {
		
		Post updatedPost=null;
		try {
			updatedPost = this.postService.updatePost(postId, postTitle, postContent, postCategory, postUser, file);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ResponseEntity.ok(updatedPost);
	}
//
//	@PutMapping("/update-post/{postId}")
//	public ResponseEntity<?> updatePost(@RequestBody Post post, @PathVariable("postId") int postId) {
//		Post previousPost = this.postRepositary.findById(postId);
//		previousPost.setPostCategory(post.getPostCategory());
//		previousPost.setPostUser(post.getPostUser());
//		previousPost.setPostContent(post.getPostContent());
//		previousPost.setPostLastmodified(post.getPostLastmodified());
//		previousPost.setPostTitle(post.getPostTitle());
//		previousPost.setPostImage(post.getPostImage());
//		Post updatedPost = this.postRepositary.save(previousPost);
//		return ResponseEntity.ok(updatedPost);
//	}
	@GetMapping("/post-by-postId/{postId}")
	public ResponseEntity<?> getPostByPostId(@PathVariable int postId) {
		Post post = this.postService.getPostById(postId);
		 if (post == null) {
	            throw new PostNotFoundByPostIdException("Post with ID " + postId + " not found");
	        } else {
	            return ResponseEntity.ok(post);
	        }
	}

	@GetMapping("/post-by-user/{user}")
	public ResponseEntity<List<Post>> getPostsByUser(@PathVariable("user") String user) {
		List<Post> posts = this.postRepositary.findByPostUser(user);
	    if (posts.isEmpty()) {
            throw new PostNotFoundByUserException("No posts found for user: " + user);
        } else {
            return ResponseEntity.ok(posts);
        }
	}

}
