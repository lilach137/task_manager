"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
class TaskController {
    constructor() {
        this.taskService = new task_service_1.TaskService();
    }
    getAllTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.getAllTasks();
                res.json(tasks);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch tasks" });
            }
        });
    }
    createTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield this.taskService.createTask(req.body);
                res.status(201).json(task);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ error: `Server error: ${error.message}` });
                }
                else {
                    res.status(500).json({ error: "An unknown error occurred" });
                }
            }
        });
    }
    updateTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const task = yield this.taskService.updateTask(Number(id), req.body);
                res.json(task);
            }
            catch (error) {
                res.status(400).json({ error: "Failed to update task" });
            }
        });
    }
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.taskService.deleteTask(Number(id));
                res.status(204).send();
            }
            catch (error) {
                res.status(400).json({ error: "Failed to delete task" });
            }
        });
    }
    getTasksByPriority(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { priority } = req.params;
                if (priority === "All") {
                    const tasks = yield this.taskService.getAllTasks();
                    return res.status(200).json(tasks);
                }
                const tasks = yield this.taskService.getTasksByPriority(priority);
                if (!tasks.length) {
                    return res.status(404).json({ message: "No tasks found with the specified priority" });
                }
                return res.status(200).json(tasks);
            }
            catch (error) {
                console.error("Error fetching tasks by priority:", error);
                return res.status(500).json({ message: "Server error" });
            }
        });
    }
    getTasksSortedByStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.taskService.getTasksSortedByStatus();
                return res.status(200).json(tasks);
            }
            catch (error) {
                console.error("Error fetching tasks sorted by status:", error);
                return res.status(500).json({ message: "Server error" });
            }
        });
    }
}
exports.TaskController = TaskController;
