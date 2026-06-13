import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const questionRoutes = require("./routes/question.routes");
const interviewRoutes = require("./routes/interview.routes");
const userRoutes = require("./routes/user.routes");

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

app.use("/api/questions", questionRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Health: http://localhost:${PORT}/health`);
});

export default app;