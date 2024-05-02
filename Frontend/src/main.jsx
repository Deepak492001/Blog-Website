import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "./context/UserContext.jsx";
import ForgotPasswordProvider from "./context/ForgotPasswordContext.jsx";
import UserBookmarkProvider from "./context/UserBookmarkContext.jsx";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <UserContextProvider>
      <UserBookmarkProvider>
        <ForgotPasswordProvider>
          <App />
        </ForgotPasswordProvider>
      </UserBookmarkProvider>
    </UserContextProvider>
  </React.StrictMode>
);
