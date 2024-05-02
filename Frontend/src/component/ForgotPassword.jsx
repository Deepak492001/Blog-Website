import React, { useContext, useState } from "react";
import {
  getOtp,
  getOtpfromLocalStorage,
  sendOtpMailToUser,
  setOtpOnLocalStorage,
} from "../service/ApiOtp";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordContext } from "../context/ForgotPasswordContext";
// import "../CSS/ForgotPassword.css";
import "../CSS/form.css";
// import forgot_password_img from "../assets/forgot_password.svg";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const { setUserEmail, userEmail } = useContext(ForgotPasswordContext);
  const navigate = useNavigate();

  const sendOtp = async () => {
    try {
      const isOtpSend = await sendOtpMailToUser(userEmail);

      if (isOtpSend !== undefined && isOtpSend.startsWith("OTP")) {
        toast.success(isOtpSend);
        const otpValue = await getOtp();
        setUserOtp(otpValue.data);
        await setOtpOnLocalStorage(otpValue.data);
      } else {
        toast.error(isOtpSend);
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      toast.error("Error sending OTP");
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setUserEmail(email);
    await sendOtp();
  };



  // Handle form submission for OTP verification
  async function otpHandler(event) {
    event.preventDefault();
    const otpValue = await getOtpfromLocalStorage();

    if (otp === String(otpValue)) {
      toast.success("OTP verified!");
      navigate(`/update-password/${email}`);
    } else {
      toast.error("Invalid OTP");
    }
  }

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={onSubmitHandler}>
          <h1 className="title">Forgot Password</h1>

          <div className="inputContainer">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              className="input"
              onChange={(e) => setEmail(e.target.value.trim())}
              placeholder="Email address"
              required={true}
            />

            <label htmlFor="email" className="label">
              Email
            </label>
          </div>

          <input type="submit" className="submitBtn" value="Enter Email" />

          {userOtp !== "" && (
            <>
              <div className="inputContainer">
                <input
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  className="input"
                  value={otp}
                  type="text"
                  onChange={(e) => setOtp(e.target.value.trim())}
                  required={true}
                />

                <label htmlFor="otp" className="label">
                  Otp
                </label>
              </div>

              <input
                type="submit"
                className="submitBtn"
                value="Enter Otp"
                onClick={otpHandler}
              />
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
