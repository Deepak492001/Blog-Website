import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { addUser, checkUserExistsByEmail } from "../service/ApiUser";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/form.css";
const SignUpForm = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();
    if (user.password.trim() !== user.confirmPassword.trim())
      toast.error("Password Didn't Matched");
    else {
      const isUserExists = await checkUserExistsByEmail(user.email);
      console.log(isUserExists.data);
      if (isUserExists.data) {
        toast.error("User with the same email already exists");
      } else {
        await addUser(user);
        toast.success("Account Created Successfully");
        toast("Good Job!", {
          icon: "👏",
        });
        navigate("/user/dashboard");
      }
    }
  }

  function onChangeHandler(event) {
    const { name, value } = event.target;
    setUser((user) => {
      return { ...user, [name]: value.trim() };
    });
  }

  return (
    <div className="form-container">
      <form onSubmit={onSubmitHandler} className="form">
        <h1 className="title">Sign up</h1>

        <div className="inputContainer">
          <input
            type="text"
            name="name"
            id="name"
                className="input"
            required={true}
            value={user.name}
            onChange={onChangeHandler}
              placeholder="Your Name"
            // className="input"
          />

          <label htmlFor="name" className="label">
            Name
          </label>
        </div>

        <div className="inputContainer">
          <input
            type="email"
            id="email"
                className="input"
            name="email"
            required={true}
            // className="input"
            onChange={onChangeHandler}
              placeholder="Email address"
          />

          <label htmlFor="email" className="label">
            Email
          </label>
        </div>

        <div className="inputContainer">
          <input
            type="password"
            id="password"
                className="input"
            required={true}
            name="password"
            minLength={8}
            // className="input"
            onChange={onChangeHandler}
              placeholder="Password"
          />

          <label htmlFor="password" className="label">
            Password
          </label>
        </div>

        <div className="inputContainer">
          <input
            type="password"
            required={true}
                className="input"
            minLength={8}
            id="confirmPassword"
            name="confirmPassword"
            // className="input"
            onChange={onChangeHandler}
              placeholder="Confirm Password"
          />

          <label htmlFor="confirmPassword" className="label">
            Confirm Password
          </label>
        </div>

        <input type="submit" className="submitBtn" value="Sign up" />
        <Link to="/forgot-password">Forgot password?</Link>
      </form>
    </div>
  );
};

export default SignUpForm;
