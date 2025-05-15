import express, { Express, Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";


// Import main router
import mainRouter from "./routes";
import envVars from "./config/env";

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
// Mount main router on /api/v1
app.use("/api/v1", mainRouter);

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("Task Manager API is running");
});

// Error handling middleware
interface ErrorWithMessage extends Error {
  stack?: string;
}

app.use(
  (err: ErrorWithMessage, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: envVars.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

// Start server with database connection
const PORT: number = parseInt(envVars.PORT || "5000", 10);

// Connect to database and start server
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    console.log(`DB connedted`);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    throw error;
  }
};

startServer();
