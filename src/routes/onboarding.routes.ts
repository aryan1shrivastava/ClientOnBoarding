import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  submitOnboardingForm,
  getOnboardingSubmission,
} from "../controllers/onboarding.controller";

const router = Router();

// Public route (for client to submit form)
router.post("/:shareableLink/submit", submitOnboardingForm);

// Protected route (for freelancer to view submissions)
router.get("/project/:projectId", protect, getOnboardingSubmission);

export default router;

