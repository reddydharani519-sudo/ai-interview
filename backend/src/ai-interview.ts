const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: function(origin: any, callback: any) {
    if (!origin || origin.startsWith("http://localhost")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

app.get("/health", (req: any, res: any) => {
  res.json({
    status: "OK",
    message: "Backend Running! 🚀",
  });
});

app.post("/api/questions", async (req: any, res: any) => {
  try {
    const { subject, difficulty, count = 5 } = req.body;
    const { generateQuestions } = require("./services/claude.service");
    const questions = await generateQuestions(subject, difficulty, count);
    res.json({ questions });
  } catch (error: any) {
    console.error("Questions error:", error);
    res.status(500).json({ error: "Failed to generate questions" });
  }
});

app.post("/api/interview/feedback", async (req: any, res: any) => {
  try {
    const { question, answer, subject, difficulty } = req.body;
    const { generateFeedback } = require("./services/claude.service");
    const feedback = await generateFeedback(question, answer, subject, difficulty);
    res.json(feedback);
  } catch (error: any) {
    console.error("Feedback error:", error);
    res.status(500).json({ error: "Failed to generate feedback" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
});