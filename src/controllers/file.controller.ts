import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs";
import { getFileUrl } from "../middlewares/upload.middleware";
import { AuthenticatedRequest } from "../types/auth";

const prisma = new PrismaClient();

// Upload files for onboarding submission (Public - no auth required)
export const uploadFiles = async (req: Request, res: Response) => {
  try {
    const { shareableLink } = req.params;

    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Find project by shareable link
    const project = await prisma.project.findUnique({
      where: { shareableLink },
      include: {
        submissions: {
          orderBy: {
            submittedAt: "desc",
          },
          take: 1, // Get the most recent submission
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Get the most recent submission or create a new one if none exists
    let submission = project.submissions[0];
    if (!submission) {
      submission = await prisma.onboardingSubmission.create({
        data: {
          projectId: project.id,
          formData: {},
        },
      });
    }

    const uploadedFiles = [];

    // Save file metadata to database
    for (const file of files) {
      const fileRecord = await prisma.fileUpload.create({
        data: {
          submissionId: submission.id,
          fileName: file.filename,
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
          storageUrl: getFileUrl(file.filename),
        },
      });

      uploadedFiles.push({
        id: fileRecord.id,
        originalName: fileRecord.originalName,
        fileName: fileRecord.fileName,
        size: fileRecord.size,
        mimeType: fileRecord.mimeType,
        uploadedAt: fileRecord.uploadedAt,
      });
    }

    return res.status(201).json({
      message: "Files uploaded successfully",
      files: uploadedFiles,
      submissionId: submission.id,
    });
  } catch (error) {
    console.log("Upload files error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Download file (Freelancer only - must own the project)
export const downloadFile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { fileId } = req.params;

    // Get file record
    const fileRecord = await prisma.fileUpload.findUnique({
      where: { id: fileId },
      include: {
        submission: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!fileRecord) {
      return res.status(404).json({ error: "File not found" });
    }

    // Verify project ownership
    if (fileRecord.submission.project.ownerId !== userId) {
      return res.status(403).json({ error: "Forbidden - You don't own this project" });
    }

    // Get file path
    const filePath = path.join(process.cwd(), "uploads", fileRecord.fileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "File not found on server" });
    }

    // Set headers and send file
    res.setHeader("Content-Disposition", `attachment; filename="${fileRecord.originalName}"`);
    res.setHeader("Content-Type", fileRecord.mimeType);

    return res.sendFile(filePath);
  } catch (error) {
    console.log("Download file error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get file info (Freelancer only)
export const getFileInfo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { fileId } = req.params;

    const fileRecord = await prisma.fileUpload.findUnique({
      where: { id: fileId },
      include: {
        submission: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!fileRecord) {
      return res.status(404).json({ error: "File not found" });
    }

    // Verify project ownership
    if (fileRecord.submission.project.ownerId !== userId) {
      return res.status(403).json({ error: "Forbidden" });
    }

    return res.status(200).json({
      id: fileRecord.id,
      originalName: fileRecord.originalName,
      fileName: fileRecord.fileName,
      mimeType: fileRecord.mimeType,
      size: fileRecord.size,
      storageUrl: fileRecord.storageUrl,
      uploadedAt: fileRecord.uploadedAt,
    });
  } catch (error) {
    console.log("Get file info error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

