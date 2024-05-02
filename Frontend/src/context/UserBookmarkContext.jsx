import { createContext, useState } from "react";

export const UserBookmarkContext = createContext();

export default function UserBookmarkProvider({ children }) {
  const [userBookmarkPostIds, setUserBookmarkPostIds] = useState([]);

  const isPostInBookmarks = (postId) => {
    console.log(typeof Number(postId));
    return userBookmarkPostIds.includes(Number(postId));
  };

  // foreach does not return any value
  const value = {
    userBookmarkPostIds,
    setUserBookmarkPostIds,
    isPostInBookmarks,
  };
  return (
    <UserBookmarkContext.Provider value={value}>
      {children}
    </UserBookmarkContext.Provider>
  );
}
