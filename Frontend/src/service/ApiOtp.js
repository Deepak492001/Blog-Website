import axios from "axios";
// const BASE_URL = "http://localhost:8080";
import BASE_URL from './config';

export const getOtp = async () => {
  try {
    return await axios.get(`${BASE_URL}/get-otp`);
  } catch (error) {
    console.log(error.message);
  }
};

export const setOtpOnLocalStorage = (otp) => {
  localStorage.setItem("otp", JSON.stringify(otp));
};

export const getOtpfromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("otp"));
};

export const sendOtpMailToUser = async (userEmail) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/send-otp?email=${userEmail}`
    );
    return response.data;
  } catch (error) {
    console.log(error.message);
    // return "Some error occurred while sending otp";
  }
};
