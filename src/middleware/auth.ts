import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types";
import User from "../models/User";
import Token from "../models/Token";

const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Get the authorization header
  const authHeader = req.headers["authorization"];

  // Check if the token exists and has the Bearer prefix
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Forbidden Access",
    });
    return;
  }

  try {
    // Verify token
    const decoded = verifyAccessToken(token);
    
    const existingToken = await User.findById(decoded.sub);

    if(!existingToken) {
      res.status(401).json({
        success: false,
        message: "Forbidden Access",
      });
      return;
    }
    // Add user to request
    Object.assign(req, {
      user: {
        _id: decoded.sub,
      },
    });

    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Please authenticate",
    });
  }
};

export { authenticateToken };
