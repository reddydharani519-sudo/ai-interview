import { Router } from "express";
import {
  submitAnswer,
  getSession,
  completeSession,
} from "../controllers/interview.controller";

const router = Router();

router.post("/feedback", submitAnswer);
router.get("/session/:sessionId", getSession);
router.put("/session/:sessionId/complete", completeSession);

export default router;