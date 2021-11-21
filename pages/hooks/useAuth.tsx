import React, { useContext } from "react";
import { auth, firestore } from "./firebase";
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserInfo,
  onAuthStateChanged,
  signOut,
  UserCredential,
} from "firebase/auth";
import { useFirestore } from "./useFirestore";
import { collection } from "@firebase/firestore";
import { getDocs, where, query } from 'firebase/firestore'

interface AuthContextType {
  emailRegister: null | ((email: string, password: string) => Promise<UserCredential>);
  loginRegister: null | ((email: string, password: string) => Promise<UserCredential>);
  currentUser: null | UserInfo;
  loggedIn: null | boolean;
  signOut: (() => Promise<void>) | null
}

interface AuthProviderProps {
  children: React.ReactNode;
}

type UseAuth = () => AuthContextType;

function registerWithEmail(email: string, password: string) {
  return new Promise<UserCredential>(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((res: UserCredential) => {
          resolve(res)
      })
      .catch(error => {
          reject(error)
      })
  });
}

function loginWithEmail(email: string, password: string) {
  return new Promise<UserCredential>(async (resolve, reject) => {
    await signInWithEmailAndPassword(auth, email, password)
            .then((user: UserCredential) => {
                resolve(user)
            })
            .catch(error => {
                reject(error)
            })
  });
}

function signout() {
  return new Promise<void>(() => {
    signOut(auth)
  })
}


  


const AuthContext = React.createContext<AuthContextType>({
  emailRegister: null,
  loginRegister: null,
  currentUser: null,
  loggedIn: null,
  signOut: null
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
        loggedIn: isLoggedIn,
        signOut: signout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth: UseAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider