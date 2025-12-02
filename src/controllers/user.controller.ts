import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { AuthenticatedRequest } from "../types/auth";

const prisma = new PrismaClient();

export const getMyProfile = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({
      error: "UserId missing or invalid",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: { id: true, email: true, name: true },
  });

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  res.status(200).json(user);
};
