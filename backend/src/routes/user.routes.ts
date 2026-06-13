import { Router } from "express";
import {
  getUser,
  updateUser,
  getUserSessions,
  getUserStats,
} from "../controllers/user.controller";

const router = Router();

router.get("/:uid", getUser);
router.put("/:uid", updateUser);
router.get("/:uid/sessions", getUserSessions);
router.get("/:uid/stats", getUserStats);

export default router;