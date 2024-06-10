import { createContext, useState } from "react";

export const UserAuthContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  // const [isAuth, setIsAuth] = useState(false);

  return (
    <UserAuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserAuthContext.Provider>
  );
};
