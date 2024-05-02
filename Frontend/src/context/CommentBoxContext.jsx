import { createContext, useState } from "react";

export const CommentBoxContext = createContext();

export default function CommentContextProvider({ children }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const data = { showCommentBox, setShowCommentBox };
  return (
    <CommentBoxContext.Provider value={value}></CommentBoxContext.Provider>
  );
}
