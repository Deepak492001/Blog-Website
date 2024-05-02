import axios from "axios";
// const BASE_URL = "http://localhost:8080";
import BASE_URL from './config';

export const addComment = async (comment) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-comment`, comment);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllCommentsByPostId = async (postId) => {
  try {
    const response = await axios.get(`${BASE_URL}/all-comments/${postId}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCommentByCommentId = async (commentId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-comment/${commentId}`);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};