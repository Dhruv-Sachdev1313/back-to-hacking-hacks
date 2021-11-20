import React, { useContext } from "react";
import { auth } from "./firebase";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserInfo,
  onAuthStateChanged
} from "firebase/auth";

interface AuthContextType {
  emailRegister: null | ((email: string, password: string) => Promise<unknown>);
  loginRegister: null | ((email: string, password: string) => Promise<unknown>);
  currentUser: null | UserInfo;
  loggedIn: null | boolean;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

type UseAuth = () => AuthContextType;

function registerWithEmail(email: string, password: string) {
  return new Promise((res, rej) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((responce) => res(responce))
      .catch((error) => rej(error));
  });
}

function loginWithEmail(email: string, password: string) {
  return new Promise((res, rej) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((responce) => res(responce))
      .catch((error) => rej(error));
  });
}

const AuthContext = React.createContext<AuthContextType>({
  emailRegister: null,
  loginRegister: null,
  currentUser: null,
  loggedIn: null
});

const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children
}) => {
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <AuthContext.Provider
      value={{
        emailRegister: registerWithEmail,
        loginRegister: loginWithEmail,
        currentUser: auth.currentUser,
        loggedIn: isLoggedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth: UseAuth = () => {
  return useContext(AuthContext);
};
