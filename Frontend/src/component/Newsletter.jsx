import React from "react";
import "../CSS/Newsletter.css"
import { Link } from "react-router-dom";
import newsImage from "../assets/newsImage.svg";
const Newsletter = () => {
  return (
    <>
      <div className="newsletter-container">
        <div className="newsletter-content">
          {/* <!-- left part  --> */}
          <div className="news-left">
            <img src={newsImage} loading="lazy" alt="news-img" />
          </div>
          {/* <!-- right part --> */}
          <div className="news-right">
            <div className="news-info">
              <h2 className="news-title">Get the latest updates</h2>

              <p className="news-desc">Sign up for our newsletter</p>
            </div>

            <form className="news-form">
              <input className="news-email" placeholder="Email" />
              <button className="news-send-button">Send</button>
            </form>

            <div className="privacy-policy">
              By signing up to our newsletter you agree to our
              <Link className="news-link">Terms of Service</Link>
              and
              <Link className="news-link">Privacy policy</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Newsletter;
