import React, { createContext, useEffect, useState } from "react";
import { supabase } from '../supabase/supabaseClient';
import { User } from "@supabase/supabase-js";

type ChildProp = {
  children: React.ReactNode;
}

type UserAuthContextType = {
  userData: User | null;
  setUserData: (user: User | null) => void;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  // redirectURL: string;
  // setRedirectURL: (url: string) => void;
};

export const UserAuthContext = createContext<UserAuthContextType>({
  userData: null, //global
  setUserData: () => {},
  isAuth: false, 
  setIsAuth: () => {},
  isLoading: true,
  setIsLoading: () => {},
  // redirectURL:"",
  // setRedirectURL: () => {}
});

export const UserContextProvider = ({ children }: ChildProp) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [redirectURL, setRedirectURL] = useState('');

  const getUserSession = async () => {

     try {
      const { data: { user }, error } = await supabase.auth.getUser();
      // console.log(error);
      if (error) {
        setIsAuth(false);
        setUserData(null);  
      } else {
        setUserData(user);
        setIsAuth(true); // Update isAuth based on user presence
      }
    } finally {
      setIsLoading(false); // Always set loading to false after fetching
    }
  }

  useEffect(() => {
    getUserSession();
  }, [])

  return (
    <UserAuthContext.Provider
      value={{
        userData,
        setUserData,
        isAuth,
        setIsAuth,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

// export const useUserContext = () => {
//   const userContext = useContext(UserAuthContext);

//   if(userContext === undefined){
//     throw new Error("userContext must be used with the whole application")
//   }
  
//   return userContext;
// }