import { useState } from "react";
import UserContext from "./userContext";

export const UserContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token);

  const [page, setPage] = useState("login");
  const user = localStorage.getItem("user");

  console.log(user);

  const object = {
    page,
    setPage,
    token,
  };

  return <UserContext.Provider value={object}>{children}</UserContext.Provider>;
};
