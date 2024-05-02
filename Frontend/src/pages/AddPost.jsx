import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { addPost } from "../service/ApiPost";
import { toast } from "react-hot-toast";
import JoditEditor from "jodit-react";
import { getAllCategories } from "../service/ApiCategory";
import { UserContext } from "../context/UserContext";
import "../CSS/AddPost.css";
const AddPost = () => {
  const editor = useRef(null);
  // check the use of this line for jodit editor
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
      direction: "ltr", // Ensure left-to-right text direction
    }),
    []
  );

  const { currentUser } = useContext(UserContext);
  const [post, setPost] = useState({
    postTitle: "",
    postContent: "",
    postCategory: "",
    postUser: currentUser.data,
    postImage: null,
  });

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  async function addPostHandler(event) {
    event.preventDefault();
    console.log(post);
    const value = await addPost(post);
    if (value !== undefined) {
      toast.success("Post added successfully");
      setPost({
        postTitle: "",
        postContent: "",
        postCategory: "",
        postImage: null,
      });
    } else toast.error("error occurred while adding post");
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

  return (
    <div className="post-container">
      <form onSubmit={addPostHandler} className="post-form">
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
              placeholder="title"
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
            style={{ textAlign: "left !important" }}
          />
        </div>

        <div className="button-group" style={{ justifyContent: "center" }}>
          <button type="submit" className="btn primary-btn">
            Add Post
          </button>
          <button type="reset" className="btn secondary-btn">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
