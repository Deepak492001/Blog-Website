import axios from "axios";
// const BASE_URL = "http://localhost:8080";
import BASE_URL from "./config";
export const addPost = async (post) => {
  try {
    const formData = new FormData();
    formData.append("postTitle", post.postTitle);
    formData.append("postContent", post.postContent);
    formData.append("postCategory", post.postCategory);
    formData.append("postUser", post.postUser);
    formData.append("postImage", post.postImage);
    const response = await axios.post(`${BASE_URL}/add-post`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    // throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    throw error;
  }
};

// export const getAllPosts = async (page, size) => {
//   try {
//     const response = await axios.get(
//       `${BASE_URL}/posts?page=${page}&size=${size}`
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching posts:', error.message);
//     throw error;
//   }
// };

export const getPostByPostId = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/post-by-postId/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error.message);
    throw error;
  }
};

export const getPostByUser = async (user) => {
  try {
    const response = await axios.get(`${BASE_URL}/post-by-user/${user}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching posts by user:", error.message);
    throw error;
  }
};

export const updateByPostId = async (post, postId) => {
  try {
    const formData = new FormData();
    formData.append("postTitle", post.postTitle);
    formData.append("postContent", post.postContent);
    formData.append("postCategory", post.postCategory);
    formData.append("postUser", post.postUser);
    formData.append("postImage", post.postImage);

    const response = await axios.post(
      `${BASE_URL}/update-post/${postId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    // throw error;
  }
};

// export const updateByPostId = async (post, postId) => {
//   try {
//     const response = await axios.put(`${BASE_URL}/update-post/${postId}`, post);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating post by ID:', error.message);
//     throw error;
//   }
// };

export const deletePostById = async (postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-post/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting post by ID:", error.message);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    throw error;
  }
};
