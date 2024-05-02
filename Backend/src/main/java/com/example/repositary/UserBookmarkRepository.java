package com.example.repositary;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.entity.UserBookmarks;

import jakarta.transaction.Transactional;
@Repository
public interface UserBookmarkRepository extends JpaRepository<UserBookmarks, Integer> {
	@Modifying
	@Transactional
	@Query("DELETE FROM UserBookmarks u WHERE u.postId = :postId AND u.userEmail = :userEmail")
	public void deleteByPostIdAndUserEmail(@Param("postId") int postId, @Param("userEmail") String userEmail);
    @Query("FROM UserBookmarks WHERE userEmail= :UserEmail ORDER BY bookmarkId DESC")
	public List<UserBookmarks> findByUserEmail(@Param("UserEmail") String UserEmail);
 
}
