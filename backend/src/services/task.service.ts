import { PrismaClient, Task } from "@prisma/client";


export class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllTasks() {
    return this.prisma.task.findMany({
      include: {
        assignee: true,
      },
    });
  }
  
  async createTask(taskData: {
    description: string;
    priority: string;
    status: string;
    date: string;
    assigneeId: number;
  }) {
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
  }
  
  async updateTask(id: number, updateData: Partial<Omit<Task, "id" | "date">>) {
    return this.prisma.task.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteTask(id: number) {
    return this.prisma.task.delete({ where: { id } });
  }

  async getTasksByPriority(priority: string) {
    return this.prisma.task.findMany({
      where: {
        priority: priority,
      },
    });
  }

  async getTasksSortedByStatus() {
    return this.prisma.task.findMany({
      orderBy: [
        {
          status: 'desc',
        },
      ],
    });
  }
}
