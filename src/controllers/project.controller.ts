import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/auth";

const prisma = new PrismaClient();

// Create a new project (Freelancer only)
export const createProject = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { projectName, projectDesc } = req.body;

    if (!projectName) {
      return res.status(400).json({ error: "Project name is required" });
    }

    const project = await prisma.project.create({
      data: {
        projectName,
        projectDesc: projectDesc || null,
        ownerId: userId,
        status: "NOT_STARTED",
      },
      select: {
        id: true,
        projectName: true,
        projectDesc: true,
        status: true,
        shareableLink: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json(project);
  } catch (error: any) {
    console.error("Create project error: ", error);
    console.error("Error details: ", error.message);
    console.error("Error code: ", error.code);
    return res.status(500).json({ 
      error: "Internal server error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all projects for the authenticated freelancer (Dashboard)
export const getMyProjects = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        projectName: true,
        projectDesc: true,
        status: true,
        shareableLink: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            submissions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Transform to include submission status
    const projectsWithStatus = projects.map((project) => ({
      ...project,
      hasSubmission: project._count.submissions > 0,
      submissionCount: project._count.submissions,
    }));

    return res.status(200).json(projectsWithStatus);
  } catch (error) {
    console.log("Get projects error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single project by ID (Freelancer only, must own it)
export const getProjectById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;

    const project = await prisma.project.findFirst({
      where: {
        id,
        ownerId: userId,
      },
      include: {
        submissions: {
          include: {
            files: true,
          },
          orderBy: {
            submittedAt: "desc",
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.log("Get project error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Update project status (Freelancer only)
export const updateProjectStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["NOT_STARTED", "IN_PROGRESS", "DONE"].includes(status)) {
      return res.status(400).json({
        error: "Valid status is required (NOT_STARTED, IN_PROGRESS, DONE)",
      });
    }

    const project = await prisma.project.findFirst({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        projectName: true,
        projectDesc: true,
        status: true,
        shareableLink: true,
        updatedAt: true,
      },
    });

    return res.status(200).json(updatedProject);
  } catch (error) {
    console.log("Update project status error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get project by shareable link (Public - for client onboarding)
export const getProjectByLink = async (req: Request, res: Response) => {
  try {
    const { shareableLink } = req.params;

    const project = await prisma.project.findUnique({
      where: {
        shareableLink,
      },
      select: {
        id: true,
        projectName: true,
        projectDesc: true,
        shareableLink: true,
        status: true,
      },
    });

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    return res.status(200).json(project);
  } catch (error) {
    console.log("Get project by link error: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

