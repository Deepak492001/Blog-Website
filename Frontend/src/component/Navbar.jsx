import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doLogout, isLoggedIn } from "../service/Authentication";
import logo from "../assets/logo.png";
import { GiHamburgerMenu } from "react-icons/gi";

import { UserContext } from "../context/UserContext";
import "../CSS/Nav.css";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
  // const [LoggedIn, setLoggedIn] = useState(false);

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [LoggedIn, setLoggedIn] = useState(currentUser.loginStatus);
  const [showNav, setShowNav] = useState(false); // State to manage the visibility of nav
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(currentUser.loginStatus);
  }, [currentUser.loginStatus]);
  console.log(currentUser.data);

  function logOutHandler() {
    setCurrentUser({
      data: "",
      loginStatus: false,
    });
    doLogout(() => {
      setLoggedIn(false);
      navigate("/");
    });
  }

  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>

      <div className="header">
        <header className="header-content">
          <Link to="/" className="logo">
            <img src={logo} alt="logoImage" className="logo-icon" />
            <span className="logo-text">Blogify</span>
          </Link>

          <nav className={`nav ${showNav ? "active" : ""}`}>
            {/* Your navigation links here */}

            {currentUser.data !== undefined && (
              <>
                <Link className="nav-link" to="/user/dashboard">
                  Add Post
                </Link>

                <Link className="nav-link" to="/all-blogs">
                  All Posts
                </Link>

                <Link
                  className="nav-link"
                  to={`/all-my-blogs/${currentUser.data}`}
                >
                  Your Posts
                </Link>

                <Link
                  className="nav-link"
                  to={`/bookmarked-blogs/${currentUser.data}`}
                >
                  Favurite Posts
                </Link>

                {/* <li className="nav-item">
                <p>Hello {currentUser.data && currentUser.data}</p>
              </li> */}
              </>
            )}

            {LoggedIn ? (
              <Link to="/">
                <button className="nav-button" onClick={logOutHandler}>
                  Logout
                </button>
              </Link>
            ) : (
              <ul className="nav-list">
                <li>
                  <Link to="/signup">
                    <button className="nav-button">Sign up </button>
                  </Link>
                </li>
                <li>
                  <Link to="/signin">
                    <button className="nav-button">Sign in</button>
                  </Link>
                </li>
              </ul>
            )}
          </nav>

          {/* Hamburger menu button */}
          <span
            type="button"
            className="menu-button"
            onClick={toggleNav} // Toggle nav visibility on button click
          >
            {showNav ? (
              <IoClose className="menu-icon" />
            ) : (
              <GiHamburgerMenu className="menu-icon " />
            )}
          </span>
        </header>
      </div>
    </>
  );
};

export default Navbar;
