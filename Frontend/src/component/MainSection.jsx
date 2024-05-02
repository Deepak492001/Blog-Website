import React from "react";
import "../CSS/MainSection.css";
import { Link } from "react-router-dom";
import sectionImage from "../assets/sectionImage.svg";
const MainSection = () => {
  return (
    <>
      <div className="content">
        <section className="main-section">
          <div className="content-left">
            <h1 className="section-title">Join us on this Journey</h1>
            <p className="section-description">
              Embark on a journey where every blog post is a door to wisdom,
              every comment a gateway to discussions, and every bookmark a
              treasure trove of cherished reads.
            </p>
            <div className="button-group">
              <Link to="/">
                <button className="start-button">Start Now</button>
              </Link>
              <Link to="/">
                <button className="tour-button">Take Tour</button>
              </Link>
            </div>
          </div>

          <div className="content-right">
            <div className="image-container">
              <img
                src={sectionImage}
                alt="sectionImage"
                className="section-image"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainSection;
