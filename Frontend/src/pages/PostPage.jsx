import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByPostId } from "../service/ApiPost";
import { toast } from "react-hot-toast";
import CommentCard from "../component/CommentCard.jsx";
import "../CSS/PostPage.css";

import { UserContext } from "../context/UserContext";
import {
  deleteCommentByCommentId,
  getAllCommentsByPostId,
} from "../service/ApiComment";
import { IoBookmarksOutline, IoBookmarks } from "react-icons/io5";
import {
  addUserBookmark,
  deleteUserBookmarkByPostId,
} from "../service/ApiUserBookmark.js";
import { UserBookmarkContext } from "../context/UserBookmarkContext.jsx";
import CommentBox from "./CommentBox.jsx";

const PostPage = ({ showCommentBox, showBookMark }) => {
  const { currentUser } = useContext(UserContext);
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const [allComments, setAllComments] = useState([]);
  const { isPostInBookmarks, userBookmarkPostIds } =
    useContext(UserBookmarkContext);

  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    checkBookmarkedOrNot();
  }, [userBookmarkPostIds, postId]);

  function checkBookmarkedOrNot() {
    if (isPostInBookmarks(postId)) {
      setBookmarked(true);
    } else {
      setBookmarked(false);
    }
  }

  useEffect(() => {
    fetchPostData();
    fetchPostComments();
  }, [postId]);

  // Fetch post data by post ID
  async function fetchPostData() {
    const data = await getPostByPostId(postId);

    setPostData(data);
  }

  // Fetch comments for the post
  async function fetchPostComments() {
    const commentData = await getAllCommentsByPostId(postId);
    setAllComments(commentData);
    console.log(commentData);
  }

  // Handler for adding/deleting bookmarks
  async function bookmarkHandler() {
    setBookmarked((prevBookmarked) => !prevBookmarked);
    const userBookmarks = {
      postId: postId,
      userEmail: currentUser.data,
    };

    if (!bookmarked) {
      const isAdded = await addUserBookmark(userBookmarks);
      if (isAdded !== undefined) {
        toast.success("Bookmarked successfully");
      } else {
        toast.error("Error occurred while adding bookmark");
      }
    } else {
      const isDeleted = await deleteUserBookmarkByPostId(
        postId,
        currentUser.data
      );
      if (isDeleted !== undefined) {
        toast.success("Deleted bookmark successfully");
      } else {
        toast.error("Error occurred while deleting bookmark");
      }
    }
  }

  async function deleteComment(commentId) {
    setAllComments((comments) => {
      return comments.filter((comment) => comment.commentId !== commentId);
    });

    await deleteCommentByCommentId(commentId);
    toast.success("Comment deleted successfully");
  }

  return (
    <>
      <div className="post-container">
        <div className="post-content">
          <div className="post-card">
            {postData.postImage && (
              <img
                src={`data:image/png;base64, ${postData.postImage}`} // Adjust the format according to the actual image type
                alt="Post"
                // style={{ maxWidth: "100%", height: "auto" }}
              />
            )}

            <div className="post-body">
              <h5 className="post-title">{postData.postTitle}</h5>
              <span
                dangerouslySetInnerHTML={{ __html: postData.postContent }}
              />
              <p className="post-date">{postData.postLastmodified}</p>
            </div>
          </div>
          <div>
            {
              <div className="bookmark-icon active" onClick={bookmarkHandler}>
                {bookmarked ? (
                  <IoBookmarks style={{ color: "blue" }} />
                ) : (
                  <IoBookmarksOutline style={{ color: "blue" }} />
                )}
              </div>
            }
          </div>
        </div>
      </div>

      <div className="comments-section">
        <h2 className="comments-heading">Comments</h2>
        <div className="comments-list">
          {/* Display comments */}
          {allComments &&
            allComments.map((comment) => (
              <CommentCard
                comment={comment}
                // setComment={setComment}
                key={comment.commentId}
                deleteComment={deleteComment}
              />
            ))}
        </div>
      </div>

      {/* {<CommentBox allComments={allComments} setAllComments={setAllComments} />} */}

      <div className="separator"></div>
      {currentUser.data && (
        <CommentBox allComments={allComments} setAllComments={setAllComments} />
      )}
    </>
  );
};

export default PostPage;
