import { Request, Response } from "express";
import { generateFeedback } from "../services/claude.service";
import { db } from "../services/firebase.service";

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { question, answer, subject, difficulty, sessionId } =
      req.body;

    if (!question || !answer) {
      return res.status(400).json({
        error: "Question and answer are required",
      });
    }

    const feedback = await generateFeedback(
      question,
      answer,
      subject,
      difficulty
    );

    // Save feedback to Firestore
    if (sessionId) {
      await db
        .collection("sessions")
        .doc(sessionId)
        .update({
          feedback: db.collection("sessions").doc(sessionId),
        });
    }

    return res.json(feedback);
  } catch (error) {
    console.error("Submit answer error:", error);
    return res.status(500).json({
      error: "Failed to process answer",
    });
  }
};

export const getSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const sessionDoc = await db
      .collection("sessions")
      .doc(sessionId)
      .get();

    if (!sessionDoc.exists) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json({ id: sessionDoc.id, ...sessionDoc.data() });
  } catch (error) {
    console.error("Get session error:", error);
    return res.status(500).json({ error: "Failed to get session" });
  }
};

export const completeSession = async (
  req: Request,
  res: Response
) => {
  try {
    const { sessionId } = req.params;
    const { score, duration } = req.body;

    await db.collection("sessions").doc(sessionId).update({
      status: "completed",
      score,
      duration,
      completedAt: new Date().toISOString(),
    });

    return res.json({ success: true });
  } catch (error) {
    console.error("Complete session error:", error);
    return res.status(500).json({
      error: "Failed to complete session",
    });
  }
};