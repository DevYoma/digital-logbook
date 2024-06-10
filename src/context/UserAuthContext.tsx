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
};

export const UserAuthContext = createContext<UserAuthContextType>({
  userData: null,
  setUserData: () => {},
  isAuth: false, 
  setIsAuth: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

export const UserContextProvider = ({ children }: ChildProp) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserSession = async () => {
    // const { data: { user }, error } = await supabase.auth.getUser();
    // if(error){
    //   setIsAuth(false);
    //   setUserData(null)
    // }
    // // console.log(user)
    // setUserData(user)
    // setIsAuth(true);  

     try {
      const { data: { user }, error } = await supabase.auth.getUser();

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
    <UserAuthContext.Provider value={{ userData, setUserData, isAuth, setIsAuth, isLoading, setIsLoading }}>
      {children}
    </UserAuthContext.Provider>
  );
};
