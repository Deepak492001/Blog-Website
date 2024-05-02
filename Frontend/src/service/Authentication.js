import axios from "axios";
// const BASE_URL = "http://localhost:8080";
import BASE_URL from './config';
export const isLoggedIn = () => {
    let data=localStorage.getItem("data");
    return data === null ?  false :  true;
}

export const doLogin = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    // callback();
}

export const doLogout = (callback) => {
    localStorage.removeItem("data");
    callback();
}

export const getCurrentUserDetails = () => {
    if (isLoggedIn()) return JSON.parse(localStorage.getItem("data"));
    else undefined;
}

export const validateUser = async (user) => {
  try {
      const response = await axios.post(`${BASE_URL}/validate-user`, user);
      return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
