import { createContext, useState } from "react";

export const ForgotPasswordContext = createContext();

export default function ForgotPasswordProvider({ children }) {
  const [userEmail, setUserEmail] = useState("");
  const value = { userEmail, setUserEmail };

  return (
    <ForgotPasswordContext.Provider value={value}>
      {children}
    </ForgotPasswordContext.Provider>
  );
}


