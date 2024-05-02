package com.example.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.entity.Post;
import com.example.entity.UserBookmarks;
import com.example.repositary.PostRepository;
import com.example.repositary.UserBookmarkRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserBookmarkService {
  @Autowired
  private UserBookmarkRepository userBookmarkRepositary;
  @Autowired
  private PostRepository postRepositary;
  
  
  public String deleteBookmark(int postId,String userEmail) {
	  this.userBookmarkRepositary.deleteByPostIdAndUserEmail(postId, userEmail);
	   return "Post deleted Successfully";
  }
  
  public List<Post> getUserBookmarks ( String userEmail){
	  List<UserBookmarks> allUserBookmarks= this.userBookmarkRepositary.findByUserEmail(userEmail);
	   this.userBookmarkRepositary.findByUserEmail(userEmail);
	  List<Post> allBookmarkedPosts= new ArrayList<>();
	  for(UserBookmarks userBookmarks : allUserBookmarks) {
		  Post post= this.postRepositary.findById(userBookmarks.getPostId());
		  if(post!=null)
			  allBookmarkedPosts.add(post);
	  }
	  return allBookmarkedPosts;
  }
  
  public List<Integer> getBookmarkPostIds(String userEmail){
	  List<UserBookmarks> userBookmarks= this.userBookmarkRepositary.findByUserEmail(userEmail);
	  List<Integer> userBookmarksPostIds=new ArrayList<>();
	  for(UserBookmarks u: userBookmarks) {
		  userBookmarksPostIds.add(u.getPostId());
	  }
	  return userBookmarksPostIds;
			  
  }
}
