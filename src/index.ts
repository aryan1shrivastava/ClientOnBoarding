import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import projectRoutes from "./routes/project.routes";
import onboardingRoutes from "./routes/onboarding.routes";
import fileRoutes from "./routes/file.routes";

// Load environment variables
dotenv.config();

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve uploaded files statically
app.use("/api/files", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/onboarding", onboardingRoutes);
app.use("/api/files", fileRoutes);

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "running!!",
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
