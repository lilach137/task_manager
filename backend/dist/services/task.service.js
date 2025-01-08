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
exports.TaskService = void 0;
const client_1 = require("@prisma/client");
class TaskService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.findMany({
                include: {
                    assignee: true,
                },
            });
        });
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Creating task with data:", taskData);
            const formattedDate = new Date(taskData.date);
            console.log("date:", formattedDate);
            return this.prisma.task.create({
                data: {
                    description: taskData.description,
                    priority: taskData.priority,
                    status: taskData.status,
                    date: formattedDate,
                    assignee: {
                        connect: { id: taskData.assigneeId },
                    },
                },
            });
        });
    }
    updateTask(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.update({
                where: { id },
                data: updateData,
            });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.delete({ where: { id } });
        });
    }
    getTasksByPriority(priority) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.findMany({
                where: {
                    priority: priority,
                },
            });
        });
    }
    getTasksSortedByStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.findMany({
                orderBy: [
                    {
                        status: 'desc',
                    },
                ],
            });
        });
    }
}
exports.TaskService = TaskService;
