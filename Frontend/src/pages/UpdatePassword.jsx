import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { updatePassword } from "../service/ApiUser";
import { ForgotPasswordContext } from "../context/ForgotPasswordContext";
// import update_password from "../assets/update_password.svg";
import "../CSS/UpdatePassword.css"; // Import your UpdatePassword.css file

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userEmail, setUserEmail } = useContext(ForgotPasswordContext);

  async function passwordHandler(event) {
    event.preventDefault();

    if (newPassword === confirmPassword) {
      try {
        const isUpdated = await updatePassword(userEmail, newPassword);

        if (isUpdated === "Password updated successfully") {
          toast.success("Password updated successfully");
          setUserEmail("");
        } else if (isUpdated === "User not found") {
          toast.error("User not found");
        } else {
          toast.error("Sorry, something went wrong");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        toast.error("Sorry, something went wrong");
      }
    } else {
      toast.error("Passwords do not match");
    }
  }

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={passwordHandler}>
          <h1 className="title">Update Password?</h1>

          <div className="inputContainer">
            <input
              name="password"
              placeholder="Enter New password"
              id="email"
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value.trim())}
              className="input"
            />

            <label htmlFor="email" className="label">
              New Password
            </label>
          </div>

          <div className="inputContainer">
            <input
              id="email"
              name="confirmPassword"
              placeholder="Confirm password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.trim())}
              className="input"
            />

            <label htmlFor="password" className="label">
              Confirm Password
            </label>
          </div>

          <input type="submit" className="submitBtn" value="Update Password" />

        </form>
      </div>


    </>
  );
};

export default UpdatePassword;
