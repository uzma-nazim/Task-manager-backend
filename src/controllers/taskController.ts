import { Request, Response } from "express";
import * as taskService from "../services/taskService";
import { AuthenticatedRequest } from "../types";

// Get all tasks
const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
  const { user } = req as AuthenticatedRequest;

    const tasks = await taskService.getAllTasks(user);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// Get single task
const getTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    if (error.message === "Task not found") {
      res.status(404).json({
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

// Create task
const createTask = async (req: Request, res: Response): Promise<void> => {
  const { user } = req as AuthenticatedRequest;
  try {
    const task = await taskService.createTask(user, req.body);

    res.status(201).json({
      success: true,
      data: task,
      message: "Task created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update task
const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { user } = req as AuthenticatedRequest;

  try {
    const task = await taskService.updateTask(user, req.params.id, req.body);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    if (error.message === "Task not found") {
      res.status(404).json({
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

// Delete task
const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { user } = req as AuthenticatedRequest;

  try {
    await taskService.deleteTask(user, req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error: any) {
    if (error.message === "Task not found") {
      res.status(404).json({
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
// Update checklist items
const updateChecklistItems = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user } = req as AuthenticatedRequest;

    const { taskId, items } = req.body;

    const task = await taskService.updateChecklistItems(user, {taskId, items});

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(404).json({
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

export {
  getAllTasks,
  updateChecklistItems,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
