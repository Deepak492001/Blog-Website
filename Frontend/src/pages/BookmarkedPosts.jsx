import { useEffect, useState } from "react";
import "../CSS/NoPostMessage.css"
import sorry from "../assets/sorry.png";
import PostCard from "../component/PostCard";
import { useParams } from "react-router-dom";
import {
  deleteUserBookmarkByPostId,
  getAllUserBookmarks,
} from "../service/ApiUserBookmark";
import { updateByPostId } from "../service/ApiPost";
import NoPostMessages from "../component/NoPostMessages";

const BookmarkedPosts = () => {
  const [posts, setPosts] = useState([]);
  const { userEmail } = useParams();

  // Fetch all bookmarked posts for the given userEmail
  async function fetchAllBookmarkedPosts() {
    try {
      const bookmarks = await getAllUserBookmarks(userEmail);
      setPosts(bookmarks); // Update the posts state with fetched bookmarks
    } catch (error) {
      console.error("Error fetching bookmarked posts:", error.message);
    }
  }

  useEffect(() => {
    fetchAllBookmarkedPosts();
  }, [userEmail]); // Add userEmail to dependency array to re-fetch on change

  // Delete a post by its postId
  async function deletePost(postId) {
    // Delete the bookmark by postId
    await deleteUserBookmarkByPostId(postId, userEmail);

    // Remove the deleted post from state
    setPosts((prevPosts) => {
      return prevPosts.filter((post) => post.postId !== postId);
    });
  }

  return (
    <>
      {posts.length > 0 ? (
        // Map over fetched posts and render PostCard component for each
        posts.map((post) => (
          <PostCard
            key={post.postId}
            post={post}
            deletePost={deletePost}
            updateByPostId={updateByPostId}
            showButtons={false}
          />
        ))
      ) : (
        // Show a message when there are no bookmarked posts
     <NoPostMessages/>
      )}
    </>
  );
};

export default BookmarkedPosts;
