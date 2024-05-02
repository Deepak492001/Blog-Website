import axios from "axios";
// const BASE_URL = "http://localhost:8080";
import BASE_URL from './config';

export const checkUserExistsByEmail = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/check-user`, email);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get user data by id

// Submit user details
export const addUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-user`, user);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePassword = async (userEmail, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/update-password/${userEmail}`, password);
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
