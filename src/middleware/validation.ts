import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { auth, task } from "../validations";

// Validation middleware factory
const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      res.status(400).json({
        success: false,
        message:errorMessage,
        error: error,
      });
      return;
    }

    next();
  };
};

// Auth validations
const registerValidation = validate(auth.registerSchema);
const loginValidation = validate(auth.loginSchema);
const refreshTokenValidation = validate(auth.refreshTokenSchema);

// Task validations
const createTaskValidation = validate(task.createTaskSchema);
const updateTaskValidation = validate(task.updateTaskSchema);
const updateChecklistItemsValidation = validate(task.updateChecklistItemsSchema);

export {
  // Auth
  registerValidation,
  loginValidation,
  refreshTokenValidation,

  // Task
  createTaskValidation,
  updateTaskValidation,
  updateChecklistItemsValidation
};
