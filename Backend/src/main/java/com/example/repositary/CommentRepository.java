package com.example.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entity.Comment;
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
 
 public List<Comment> findByPostId(int postId);
public Comment deleteById(int commentId); 
}
