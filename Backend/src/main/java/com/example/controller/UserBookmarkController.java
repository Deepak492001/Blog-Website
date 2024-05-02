package com.example.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Post;
import com.example.entity.UserBookmarks;

import com.example.repositary.UserBookmarkRepository;
import com.example.service.UserBookmarkService;

@RestController
@CrossOrigin("*")
public class UserBookmarkController {
	@Autowired
	private UserBookmarkRepository userBookmarkRepositary;
	@Autowired
	private UserBookmarkService userBookmarkService;
	@PostMapping("/add-bookmark")
	public ResponseEntity<UserBookmarks> addUserBookmark(@RequestBody UserBookmarks userBookmarks) {
	    UserBookmarks savedBookmark = this.userBookmarkRepositary.save(userBookmarks);
	    return ResponseEntity.ok(savedBookmark);
	}

	@DeleteMapping("/delete-bookmark/{postId}/{userEmail}")
	public ResponseEntity<?> deleteUserBookmark(@PathVariable("postId") int postId, @PathVariable("userEmail") String userEmail) {
	    String message = this.userBookmarkService.deleteBookmark(postId, userEmail);
	    return ResponseEntity.ok(message); // Assuming the message indicates success or failure
	}

	@GetMapping("/get-all-bookmarks/{userEmail}")
	public ResponseEntity<List<Post>> getAllUserBookmarks(@PathVariable("userEmail") String userEmail) {
	    List<Post> bookmarks = this.userBookmarkService.getUserBookmarks(userEmail);
	    return ResponseEntity.ok(bookmarks);
	}

	@GetMapping("/get-bookmark-postId/{userEmail}")
	public ResponseEntity<List<Integer>> getAllUserBookmarksPostIds(@PathVariable("userEmail") String userEmail) {
	    List<Integer> postIds = this.userBookmarkService.getBookmarkPostIds(userEmail);
	    return ResponseEntity.ok(postIds);
	}

}