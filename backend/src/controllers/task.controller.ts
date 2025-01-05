import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { PrismaClient, Prisma } from '@prisma/client';

export class TaskController {
  private taskService: TaskService;

  constructor() {
    this.taskService = new TaskService();
  }

  async getAllTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  }

  async createTask(req: Request, res: Response): Promise<void> {
    try {
      const task = await this.taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Server error: ${error.message}` });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  }
  

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const task = await this.taskService.updateTask(Number(id), req.body);
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: "Failed to update task" });
    }
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.taskService.deleteTask(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: "Failed to delete task" });
    }
  }

  async getTasksByPriority(req: Request, res: Response) {
    try {
      const { priority } = req.params;

      if (priority === "All") {
        const tasks = await this.taskService.getAllTasks();
        return res.status(200).json(tasks);
      }
  
      const tasks = await this.taskService.getTasksByPriority(priority);
  
      if (!tasks.length) {
        return res.status(404).json({ message: "No tasks found with the specified priority" });
      }
  
      return res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks by priority:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
  

    async getTasksSortedByStatus(req: Request, res: Response) {
        try {
          const tasks = await this.taskService.getTasksSortedByStatus();
          return res.status(200).json(tasks);
        } catch (error) {
          console.error("Error fetching tasks sorted by status:", error);
          return res.status(500).json({ message: "Server error" });
        }
      }
}

