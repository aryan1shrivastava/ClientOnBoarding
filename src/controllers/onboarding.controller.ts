import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/auth";

const prisma = new PrismaClient();

// Submit onboarding form (Public - no auth required)
export const submitOnboardingForm = async (req: Request, res: Response) => {
  try {
    const { shareableLink } = req.params;
    const { clientName, clientEmail, formData } = req.body;

    // Find project by shareable link
    const project = await prisma.project.findUnique({
      where: { shareableLink },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Create onboarding submission
    const submission = await prisma.onboardingSubmission.create({
      data: {
        projectId: project.id,
        clientName: clientName || null,
        clientEmail: clientEmail || null,
        formData: formData || {},
      },
      include: {
        files: {
          select: {
            id: true,
            fileName: true,
            originalName: true,
            mimeType: true,
            size: true,
            uploadedAt: true,
          },
        },
      },
    });

    // Update project status to IN_PROGRESS if it was NOT_STARTED
    if (project.status === "NOT_STARTED") {
      await prisma.project.update({
        where: { id: project.id },
        data: { status: "IN_PROGRESS" },
      });
    }

    return res.status(201).json({
      message: "Onboarding form submitted successfully",
      submission: {
        id: submission.id,
        clientName: submission.clientName,
        clientEmail: submission.clientEmail,
        submittedAt: submission.submittedAt,
        fileCount: submission.files.length,
      },
    });
  } catch (error) {
    console.log("Submit onboarding form error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get onboarding submission (Freelancer only - must own the project)
export const getOnboardingSubmission = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { projectId } = req.params;

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Get all submissions for this project
    const submissions = await prisma.onboardingSubmission.findMany({
      where: {
        projectId,
      },
      include: {
        files: {
          select: {
            id: true,
            fileName: true,
            originalName: true,
            mimeType: true,
            size: true,
            storageUrl: true,
            uploadedAt: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    return res.status(200).json({
      project: {
        id: project.id,
        projectName: project.projectName,
        status: project.status,
      },
      submissions,
    });
  } catch (error) {
    console.log("Get onboarding submission error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

