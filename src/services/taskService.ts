import Task from "../models/Task";
import { RequestUser, TaskDocument } from "../types";

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface ChecklistItemUpdate {
  id: string;
  completed: boolean;
}

interface CreateTaskData {
  title: string;
  checklistItems?: ChecklistItem[];
  user: string;
}

interface UpdateTaskData {
  title?: string;
  checklistItems?: ChecklistItem[];
}

interface UpdateChecklistItemsData {
  taskId: string;
  items: ChecklistItemUpdate[];
}

// Get all tasks
const getAllTasks = async (user:RequestUser): Promise<TaskDocument[]> => {
  return await Task.find({user}).sort({ createdAt: -1 });
};



// Get single task by ID
const getTaskById = async (taskId: string): Promise<TaskDocument> => {
  const task = await Task.findById(taskId).populate("user", "username");

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

// Create new task
const createTask = async (
  user: RequestUser,
  taskData: CreateTaskData
): Promise<TaskDocument> => {
  const { title, checklistItems } = taskData;

  const task = await Task.create({
    title,
    checklistItems,
    user,
  });

  return task;
};

// Update task
const updateTask = async (
  user: RequestUser,
  taskId: string,
  taskData: UpdateTaskData
): Promise<TaskDocument> => {
  const { title, checklistItems } = taskData;

  // First check if task exists
  
  let task = await Task.findOne({ _id: taskId, user });

  if (!task) {
    throw new Error("Task not found");
  }

  // Update the task
  task = await Task.findByIdAndUpdate(
    taskId,
    { title, checklistItems },
    { new: true, runValidators: true }
  );

  if (!task) {
    throw new Error("Task update failed");
  }

  return task;
};

// Update checklist items
const updateChecklistItems = async (
  user: RequestUser,
  data: UpdateChecklistItemsData
): Promise<TaskDocument> => {
  const { taskId, items } = data;
  
  // Find the task
  const task = await Task.findOne({_id: taskId, user });
  
  if (!task) {
    throw new Error("Task not found");
  }
  
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { checklistItems: items },
    { new: true, runValidators: true }
  ).populate("user", "username");
  
  if (!updatedTask) {
    throw new Error("Failed to update checklist items");
  }
  
  return updatedTask;
};

// Delete task
const deleteTask = async (user: RequestUser, taskId: string): Promise<boolean> => {
  let task = await Task.findOne({ _id: taskId, user });


  if (!task) {
    throw new Error("Task not found");
  }

  await task.deleteOne();

  return true;
};

export {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  updateChecklistItems,
  deleteTask,
  CreateTaskData,
  UpdateTaskData,
  ChecklistItem,
  ChecklistItemUpdate,
  UpdateChecklistItemsData
};
