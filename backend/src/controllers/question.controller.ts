import { Request, Response } from "express";
import { generateQuestions } from "../services/claude.service";

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const { subject, difficulty, count = 10 } = req.body;

    if (!subject || !difficulty) {
      return res.status(400).json({
        error: "Subject and difficulty are required",
      });
    }

    const questions = await generateQuestions(
      subject,
      difficulty,
      Number(count)
    );

    return res.json({ questions });
  } catch (error) {
    console.error("Get questions error:", error);
    return res.status(500).json({
      error: "Failed to generate questions",
    });
  }
};