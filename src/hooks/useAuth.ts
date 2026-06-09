import { useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/user";

export const useAuth = () => {
  const { user, loading, error, setUser, setLoading, setError, clearAuth } =
    useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          const newUser: User = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || "",
            displayName: firebaseUser.displayName || "User",
            photoURL: firebaseUser.photoURL || "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            role: "user",
            preferences: {
              theme: "dark",
              notifications: true,
              soundEffects: true,
              autoCamera: true,
              language: "en",
            },
            stats: {
              totalInterviews: 0,
              averageScore: 0,
              hoursPracticed: 0,
              bestSubject: "",
              currentStreak: 0,
              longestStreak: 0,
              totalQuestions: 0,
              correctAnswers: 0,
            },
          };
          await setDoc(doc(db, "users", firebaseUser.uid), newUser);
          setUser(newUser);
        }
      } else {
        clearAuth();
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(result.user, { displayName });
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearAuth();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    loginWithGoogle,
    logout,
  };
};