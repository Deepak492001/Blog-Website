import axios from "axios";
// const BASE_URL = "http://localhost:8080";
import BASE_URL from './config';
export const getAllUserBookmarks = async (userEmail) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get-all-bookmarks/${userEmail}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const addUserBookmark = async (userBookmarks) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/add-bookmark`,
      userBookmarks
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUserBookmarkByPostId = async (postId, userEmail) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/delete-bookmark/${postId}/${userEmail}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUserBookmarksPostIds = async (userEmail) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/get-bookmark-postId/${userEmail}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
