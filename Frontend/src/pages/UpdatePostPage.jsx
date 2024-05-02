import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getPostByPostId, updateByPostId } from "../service/ApiPost";
import { UserContext } from "../context/UserContext";
import { getAllCategories } from "../service/ApiCategory";
import JoditEditor from "jodit-react";
import "../CSS/AddPost.css"; // Import the styles from AddPost.css

const UpdatePostPage = () => {
  const { currentUser } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const editor = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const [post, setPost] = useState({
    postTitle: "",
    postContent: "",
    postCategory: "",
    postUser: currentUser.data,
    postImage: null,
  });

  const { postId } = useParams();

  async function updatePostHandler(event) {
    event.preventDefault();
    console.log(post);
    const value = await updateByPostId(post, postId);
    console.log(value);

    if (value !== undefined) {
      toast.success("Post Updated successfully");
      setPost({
        postTitle: "",
        postContent: "",
        postCategory: "",
        postImage: null,
      });
    } else toast.error("error occurred while updating post");
  }

  function onChangeHandler(event) {
    const { name, value, files } = event.target;
    if (name === "postImage") {
      setPost((post) => ({
        ...post,
        postImage: files[0], // Set the postImage to the selected file
      }));
    } else {
      setPost((prevPost) => ({ ...prevPost, [name]: value }));
    }
  }

  useEffect(() => {
    fetchCategories();
    setPostDetails();
  }, []);

  async function fetchCategories() {
    const categoryData = await getAllCategories();
    setCategories(categoryData);
  }

  async function fetchPostDetails(postId) {
    return await getPostByPostId(postId);
  }

  async function setPostDetails() {
    try {
      const postData = await fetchPostDetails(postId);
      if (postData) {
        setPost(postData);
      }
    } catch (error) {
      toast.error("Sorry, Some Error Occurred while Fetching Data");
      console.error("Error fetching post details:", error);
    }
  }

  return (
    <>
      <div className="post-container">
        <form onSubmit={updatePostHandler} className="post-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="postTitle">Title</label>
              <input
                type="text"
                id="postTitle"
                className="form-control"
                onChange={onChangeHandler}
                name="postTitle"
                required
                value={post.postTitle}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postCategory">Category</label>
              <select
                required
                className="select"
                onChange={onChangeHandler}
                name="postCategory"
                value={post.postCategory}
                id="postCategory"
              >
                <option disabled value="">
                  Select an option
                </option>
                {categories.map((postCategory) => (
                  <option
                    key={postCategory.categoryId}
                    value={postCategory.categoryName}
                  >
                    {postCategory.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="postImage">Image</label>
            <input
              type="file"
              id="postImage"
              className="form-control"
              onChange={onChangeHandler}
              name="postImage"
              // required
            />
          </div>

          <div className="form-group">
            <label htmlFor="postContent">Content</label>
            <JoditEditor
              ref={editor}
              value={post.postContent}
              config={config}
              onChange={(newContent) => {
              setPost((prevPost) => ({ ...prevPost, postContent: newContent }));
              setContent(newContent);
            }}
            />
          </div>

          <div className="button-group" style={{ justifyContent: "center" }}>
            <button type="submit" className="btn primary-btn">
              Update Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdatePostPage;
