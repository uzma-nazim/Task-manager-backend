import { Request, Response } from "express";
import * as authService from "../services/authService";
import { AuthenticatedRequest } from "../types";

// Register a new user
const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Login user
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Refresh token
const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await authService.refreshToken(req.body.refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        accessToken: result,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout user
const logout = async (req: Request, res: Response): Promise<void> => {
  const { user } = req as AuthenticatedRequest;
  

  try {
    // Get refresh token from cookie or request body
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
      res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
      return;
    }

    // If user ID is available from authenticated request

    if (user) {
      await authService.logout(user._id, refreshToken);
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export { register, login, refreshAccessToken, logout };
