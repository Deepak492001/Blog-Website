package com.example.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.entity.Post;
import com.example.entity.User;
@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{
public List<Post> findByPostUser(User user);

@Query("FROM Post WHERE postUser = :user ORDER BY postId DESC")
public List<Post> findByPostUser(@Param("user") String user);
@Query("FROM Post  ORDER BY postId DESC")
public List<Post> findALL ();
 public Post findById(int postId);

}

