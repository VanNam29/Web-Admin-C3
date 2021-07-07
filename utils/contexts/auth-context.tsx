import React, { useContext, useState, FC, useEffect } from "react";
import { User } from "../../types/type";
import { ReactElement } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext(null);

interface PropsAuthContext {
  children?: ReactElement;
  username?: string;
  password?: string;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<PropsAuthContext> = (props) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: any = {
    currentUser,
    signUp,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
