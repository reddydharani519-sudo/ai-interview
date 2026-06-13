import { Request, Response } from "express";
import { db } from "../services/firebase.service";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.json({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ error: "Failed to get user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const data = req.body;
    await db.collection("users").doc(uid).update(data);
    return res.json({ success: true });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ error: "Failed to update user" });
  }
};

export const getUserSessions = async (
  req: Request,
  res: Response
) => {
  try {
    const { uid } = req.params;
    const snapshot = await db
      .collection("sessions")
      .where("userId", "==", uid)
      .orderBy("startedAt", "desc")
      .limit(20)
      .get();

    const sessions = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.json({ sessions });
  } catch (error) {
    console.error("Get sessions error:", error);
    return res.status(500).json({ error: "Failed to get sessions" });
  }
};

export const getUserStats = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const snapshot = await db
      .collection("sessions")
      .where("userId", "==", uid)
      .where("status", "==", "completed")
      .get();

    const completedSessions = snapshot.docs.map((doc: any) =>
      doc.data()
    );

    const totalInterviews = completedSessions.length;

    let totalScore = 0;
    completedSessions.forEach((s: any) => {
      totalScore += s.score || 0;
    });

    const averageScore =
      totalInterviews > 0
        ? Math.round(totalScore / totalInterviews)
        : 0;

    return res.json({
      totalInterviews,
      averageScore,
      hoursPracticed: Math.round(totalInterviews * 0.3),
    });
  } catch (error) {
    console.error("Get stats error:", error);
    return res.status(500).json({ error: "Failed to get stats" });
  }
};