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

import com.example.entity.Comment;
import com.example.repositary.CommentRepository;

@RestController
@CrossOrigin("*")
public class CommentController {
	@Autowired
	private CommentRepository commentRepository;
	
	@GetMapping("/all-comments/{postId}")
	public ResponseEntity<List<Comment>> getAllComments(@PathVariable("postId") int postId) {
	    List<Comment> comments = this.commentRepository.findByPostId(postId);
	    return ResponseEntity.ok(comments);
	}

	@PostMapping("/add-comment")
	public ResponseEntity<Comment> addComment(@RequestBody Comment comment) {
	    Comment savedComment = this.commentRepository.save(comment);
	    return ResponseEntity.ok(savedComment);
	}

	@DeleteMapping("/delete-comment/{commentId}")
	public ResponseEntity<Void> deleteComment(@PathVariable("commentId") int commentId) {
	    this.commentRepository.deleteById(commentId);
	    return ResponseEntity.noContent().build();
	}

}
