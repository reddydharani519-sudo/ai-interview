import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDocument = async <T>(
    collectionName: string,
    documentId: string
  ): Promise<T | null> => {
    try {
      setLoading(true);
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCollection = async <T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> => {
    try {
      setLoading(true);
      const colRef = collection(db, collectionName);
      const q = query(colRef, ...constraints);
      const querySnap = await getDocs(q);
      return querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const setDocument = async <T extends object>(
    collectionName: string,
    documentId: string,
    data: T
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await setDoc(doc(db, collectionName, documentId), data);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (
    collectionName: string,
    documentId: string,
    data: Record<string, any>
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await updateDoc(doc(db, collectionName, documentId), data);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (
    collectionName: string,
    documentId: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, collectionName, documentId));
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getUserSessions = async (userId: string) => {
    return getCollection("sessions", [
      where("userId", "==", userId),
      orderBy("startedAt", "desc"),
      limit(20),
    ]);
  };

  const getUserStats = async (userId: string) => {
    return getDocument("users", userId);
  };

  const subscribeToDocument = <T>(
    collectionName: string,
    documentId: string,
    callback: (data: T | null) => void
  ) => {
    const docRef = doc(db, collectionName, documentId);
    return onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        callback({ id: snap.id, ...snap.data() } as T);
      } else {
        callback(null);
      }
    });
  };

  return {
    loading,
    error,
    getDocument,
    getCollection,
    setDocument,
    updateDocument,
    deleteDocument,
    getUserSessions,
    getUserStats,
    subscribeToDocument,
  };
};