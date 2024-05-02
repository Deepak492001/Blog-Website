import React, { useEffect, useState } from "react";
import "../CSS/NoPostMessage.css";
import {
  deletePostById,
  getPostByUser,
  updateByPostId,
} from "../service/ApiPost";
import { toast } from "react-hot-toast";
import PostCard from "../component/PostCard";
import { useParams } from "react-router-dom";
import NoPostMessages from "../component/NoPostMessages";
import Filter from "../component/Filter";
import SearchPost from "../component/SearchPost"; // Holds filtered posts
const MyPosts = () => {
  const [category, setCategory] = useState("ALL"); // Holds the selected category
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search query
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState([]);
  const { user } = useParams();
  async function fetchMyPosts() {
    const postData = await getPostByUser(user);
    if (postData !== undefined) {
      setTotalPosts(postData);
    } else {
      toast.error(postData);
    }
  }
  useEffect(() => {
    fetchMyPosts();
  }, []);

  async function deletePost(postId) {
    setTotalPosts((prevPosts) => {
      return prevPosts.filter((post) => post.id !== postId);
    });
    await deletePostById(postId);
    await fetchMyPosts();
  }

  // Filter posts based on category whenever category changes
  useEffect(() => {
    if (category === "ALL") {
      setFilteredPosts(totalPosts); // Set filtered posts based on category
    } else {
      setFilteredPosts(
        totalPosts.filter((post) => post.postCategory === category)
      );
    }
  }, [category, totalPosts]);

  // Filter posts based on search query and/or category whenever searchQuery or category changes
  useEffect(() => {
    // setLoading(true);
    let filteredPostsData = totalPosts;

    if (searchQuery.trim() !== "") {
      filteredPostsData = filteredPostsData.filter(
        (post) =>
          post.postTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.postContent.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== "ALL") {
      filteredPostsData = filteredPostsData.filter(
        (post) => post.postCategory === category
      );
    }

    setFilteredPosts(filteredPostsData);
    // setLoading(false);
  }, [searchQuery, category, totalPosts]);

  return (
    <>
      <Filter setCategory={setCategory} />
      <SearchPost setSearchQuery={setSearchQuery} />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostCard
            key={post.postId}
            post={post}
            deletePost={deletePost}
            updateByPostId={updateByPostId}
            showButtons={true}
            showBookMark={false}
            showCommentBox={false}
          />
        ))
      ) : (
        <NoPostMessages />
      )}
    </>
  );
};

export default MyPosts;
