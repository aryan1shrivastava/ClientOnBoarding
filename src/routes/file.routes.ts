import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middleware";
import {
  uploadFiles,
  downloadFile,
  getFileInfo,
} from "../controllers/file.controller";

const router = Router();

// Public route (for client to upload files)
router.post("/:shareableLink/upload", upload.array("files", 10), uploadFiles);

// Protected routes (for freelancer to download/view files)
router.get("/:fileId/download", protect, downloadFile);
router.get("/:fileId/info", protect, getFileInfo);

export default router;

