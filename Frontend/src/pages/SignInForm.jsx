import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { doLogin, validateUser } from "../service/Authentication";
import { UserContext } from "../context/UserContext";
import "../CSS/form.css";
const SignInForm = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  async function onSubmitHandler(event) {
    event.preventDefault();

    const message = await validateUser(user);

    if (message.startsWith("Welcome")) {
      setCurrentUser({
        data: user.email,
        loginStatus: true,
      });

      toast.success("Successfully Logged in");
      doLogin(user.email);
      navigate("/user/dashboard");
    } else {
      toast.error(message);
    }
  }

  function onChangeHandler(event) {
    const { name, value } = event.target;
    setUser((user) => {
      return { ...user, [name]: value.trim() };
    });
  }

  return (
    <>
      <div className="form-container">
        <form className="form" onSubmit={onSubmitHandler}>
          <h1 className="title">Sign in</h1>

          <div className="inputContainer">
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              className="input"
              onChange={onChangeHandler}
              placeholder="Email address"
              required={true}
            />

            <label htmlFor="email" className="label">
              Email
            </label>
          </div>

          <div className="inputContainer">
            <input
              type="password"
              id="password"
              name="password"
                  className="input"
              onChange={onChangeHandler}
              placeholder="Password"
              required={true}
            />

            <label htmlFor="password" className="label">
              Password
            </label>
          </div>

          <input type="submit" className="submitBtn" value="Sign in" />
             <Link to="/forgot-password" className="forgot-password" >Forgot password?</Link>

        </form>
      </div>
    </>
  );
};

export default SignInForm;
