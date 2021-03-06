import React, { useContext, useState, FC, useEffect } from "react";
import { User } from "../../types/type";
import { ReactElement } from "react";
import firebase from "../firebase";
import nookies from "nookies";
import router from "next/router";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const signUp = (email: string, password: string) => {
    // debugger;
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const resetPassword = (email: string) => {
    return firebase.auth().sendPasswordResetEmail(email);
  };

  const socialMediaAuth = (provider) => {
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        if (res.user) {
          setUser(res.user);
          router.push("/customers");
        }
      })
      .catch((error) => {
        return error;
      });
  };

  const logout = () => {
    return firebase.auth().signOut();
  };

  //token
  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, "token", "", { path: "/login" });
      } else {
        const token: string = await user.getIdToken();
        setToken(token);

        setUser(user);
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user: User) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value: Object = {
    currentUser,
    signUp,
    login,
    resetPassword,
    logout,
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
