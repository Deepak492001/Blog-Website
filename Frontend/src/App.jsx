import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpForm from "./pages/SignUpForm";
import SignInForm from "./pages/SignInForm";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./component/Footer";
import AllPosts from "./pages/AllPosts";

import PostPage from "./pages/PostPage";
import MyPosts from "./pages/MyPosts";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import UpdatePostPage from "./pages/UpdatePostPage";

import ForgotPassword from "./component/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import BookmarkedPosts from "./pages/BookmarkedPosts";

import { Toaster } from "react-hot-toast";
import Loader from "./component/Loader";


function App() {
  const { currentUser } = useContext(UserContext);
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route
            path="/update-post-page/:postId"
            element={<UpdatePostPage />}
          />
          <Route path="/user" element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/all-blogs" element={<AllPosts />} />
          <Route path={`/all-my-blogs/:user`} element={<MyPosts />} />
          <Route path="/show-post/:postId" element={<PostPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password/:email" element={<UpdatePassword />} />
          <Route
            path="/bookmarked-blogs/:userEmail"
            element={<BookmarkedPosts />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
{/* <Loader/> */}
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </BrowserRouter>
    </>
  );
}

export default App;
