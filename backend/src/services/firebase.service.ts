import * as admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

export const getUserById = async (uid: string) => {
  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (userDoc.exists) {
      return { id: userDoc.id, ...userDoc.data() };
    }
    return null;
  } catch (error) {
    console.error("Get user error:", error);
    return null;
  }
};

export const updateUserStats = async (
  uid: string,
  stats: any
) => {
  try {
    await db.collection("users").doc(uid).update({
      stats,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Update stats error:", error);
    return false;
  }
};

export const saveSession = async (
  sessionId: string,
  sessionData: any
) => {
  try {
    await db.collection("sessions").doc(sessionId).set({
      ...sessionData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Save session error:", error);
    return false;
  }
};

export default { db, auth, getUserById, updateUserStats, saveSession };