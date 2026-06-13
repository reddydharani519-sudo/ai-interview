import { Router } from "express";
import { getQuestions } from "../controllers/question.controller";

const router = Router();

router.post("/", getQuestions);

export default router;