import React, { useEffect, useState, useContext } from "react";
import { getAllPosts } from "../service/ApiPost";
import PostCard from "../component/PostCard";
// import InfiniteScroll from "react-infinite-scroll-component";
import Filter from "../component/Filter";
import SearchPost from "../component/SearchPost";
import Loader from "../component/Loader";
import { getAllUserBookmarksPostIds } from "../service/ApiUserBookmark";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { UserBookmarkContext } from "../context/UserBookmarkContext";
import NoPostMessages from "../component/NoPostMessages";

const AllPosts = () => {
  // State variables initialization
  const [totalPosts, setTotalPosts] = useState([]); // Holds all posts
  const [filteredPosts, setFilteredPosts] = useState([]); // Holds filtered posts
  const [category, setCategory] = useState("ALL"); // Holds the selected category
  const [searchQuery, setSearchQuery] = useState(""); // Holds the search query
  const [loading, setLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const { userBookmarkPostIds, setUserBookmarkPostIds } =
    useContext(UserBookmarkContext);

  // Fetch bookmarked postsIds
  async function fetchAllBookmarkedPostIds() {
    try {
      const postIDs = await getAllUserBookmarksPostIds(currentUser.data);
      if (postIDs !== undefined) {
        setUserBookmarkPostIds(postIDs);
        console.log(userBookmarkPostIds);
      } else {
        toast.error("Error occurred while fetching user bookmarks post IDs");
      }
    } catch (error) {
      toast.error("Error occurred while fetching user bookmarks post IDs");
    }
  }

  useEffect(() => {
    fetchAllBookmarkedPostIds();
  }, []);

  // Fetch all posts from the API
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Fetch all posts from the API and initialize states

  async function fetchAllPosts() {
    setLoading(true);

    try {
      const allPosts = await getAllPosts();
      console.log(allPosts);

      setTotalPosts(allPosts);
    } catch (error) {
      toast.error("Error occurred while fetching posts");
      setLoading(false);
    }
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
    setLoading(true);
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
    setLoading(false);
  }, [searchQuery, category, totalPosts]);

  return (
    <>
      <Filter setCategory={setCategory} />
      <SearchPost setSearchQuery={setSearchQuery} />
      {totalPosts.length > 0 ? (
        loading ? (
          <Loader />
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.postId}
              post={post}
              showButtons={false}
              showCommentBox={true}
              showBookMark={true}
            />
          ))
        )
      ) : (
        // Show a message when there are no bookmarked posts
        <NoPostMessages />
      )}

    </>
  );
};

export default AllPosts;
