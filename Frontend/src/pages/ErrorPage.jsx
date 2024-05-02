import React from 'react';
import error from "../assets/error.svg";
import '../CSS/errorPage.css'; // Import the CSS file

const ErrorPage = () => {
  return (
    <div className="error-page">
      {/* <div>ErrorPage</div> */}
      <img src={error} alt="error img" />
      {/* Additional elements if needed, e.g., */}
      {/* <p>A brief explanation of the error.</p> */}
      {/* <a href="#">Go back to homepage</a> */}
    </div>
  );
};

export default ErrorPage;
