import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useState } from "react";
import { auth } from "../services/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function signIn(email, password) {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  async function createAccount(email, password) {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );
      return credential.user;
    } catch (error) {
      throw error;
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }

  const value = {
    user,
    loading,
    signIn,
    createAccount,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
