import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  createProject,
  getMyProjects,
  getProjectById,
  updateProjectStatus,
  getProjectByLink,
} from "../controllers/project.controller";

const router = Router();

// Protected routes (Freelancer only)
router.post("/", protect, createProject);
router.get("/", protect, getMyProjects);
router.get("/:id", protect, getProjectById);
router.patch("/:id/status", protect, updateProjectStatus);

// Public route (for client onboarding)
router.get("/link/:shareableLink", getProjectByLink);

export default router;

