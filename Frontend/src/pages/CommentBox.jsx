import React, { useContext, useState } from "react";
import CommentCard from "../component/CommentCard";
import { addComment } from "../service/ApiComment";
import toast from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import "../CSS/CommentBox.css";
const CommentBox = ({ allComments, setAllComments }) => {
  const { currentUser } = useContext(UserContext);
  const { postId } = useParams();
  const [comment, setComment] = useState({
    commentId: "",
    content: "",
    userEmail: currentUser.data,
    postId: postId,
  });

  function onChangeHandler(event) {
    const { name, value } = event.target;

    setComment((data) => {
      return { ...data, [name]: value };
    });
  }

  async function onSubmitHandler(event) {
    event.preventDefault();
    console.log(comment);
    const value = await addComment(comment);

    console.log("value is");
    console.log(value);
    if (value !== undefined) {
      if (allComments.length == 0) {
        setAllComments([comment]);
      } else {
        setAllComments((comments) => [...comments, { ...comment }]);
      }
      toast.success("Comment added successfully");
    } else {
      toast.error("Comment not added");
    }
    setComment({ content: " " });
  }
  return (
    <>
      <form className="comment-form" onSubmit={onSubmitHandler}>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="comment"
            name="content"
            value={comment.content}
            className="form-control form-control-lg"
            onChange={onChangeHandler}
            required={true}
            placeholder="Add Comment here"
          />
          <button type="submit" className="comment-btn">
            Add Comment
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentBox;
