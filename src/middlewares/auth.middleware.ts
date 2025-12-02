import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/auth";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized, no token",
      });
    }

    const token = authHeader.split(" ")[1] as string;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    (req as AuthenticatedRequest).user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized, invalid token" });
  }
};
