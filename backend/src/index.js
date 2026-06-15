const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Log all requests
app.use(function(req, res, next) {
  console.log(req.method + " " + req.url);
  next();
});

app.get("/health", function(req, res) {
  res.json({ status: "OK", message: "Backend Running! 🚀" });
});

app.post("/api/questions", async function(req, res) {
  try {
    const subject = req.body.subject || "General";
    const difficulty = req.body.difficulty || "easy";
    const count = req.body.count || 5;
    console.log("Questions request:", subject, difficulty);
    const service = require("./services/claude.service");
    const questions = await service.generateQuestions(
      subject,
      difficulty,
      count
    );
    console.log("Questions done:", questions.length);
    return res.json({ questions });
  } catch (error) {
    console.error("Questions error:", error.message);
    return res.status(500).json({
      error: error.message,
      questions: [],
    });
  }
});

app.post("/api/interview/feedback", async function(req, res) {
  try {
    const question = req.body.question || "";
    const answer = req.body.answer || "";
    const subject = req.body.subject || "General";
    const difficulty = req.body.difficulty || "easy";
    console.log("Feedback request received");
    const service = require("./services/claude.service");
    const feedback = await service.generateFeedback(
      question,
      answer,
      subject,
      difficulty
    );
    return res.json(feedback);
  } catch (error) {
    console.error("Feedback error:", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, function() {
  console.log("Server running on port " + PORT);
});