import { Task } from "./types/ITask";


export const authenticateUser = async (payload: { email: string; password: string; name?: string }) => {
  try {
    const url = payload.name
      ? "http://localhost:3000/users"
      : "http://localhost:3000/login";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to authenticate");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error authenticating user:", error);
  }
};


export const addTask = async (task: Task) => {
  try {
    const { assignee,...taskWithoutAssigneeName } = task;
    
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskWithoutAssigneeName),
    });

    if (!response.ok) {
      throw new Error("Failed to add task");
    }
    const newTask = await response.json();
    return newTask;
  } catch (error) {
    console.error("Error adding task:", error);
  }
};


export const updateTask = async (task: Task) => {
  try {
    const { assignee,...taskWithoutAssigneeName } = task;
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskWithoutAssigneeName),
    });

    if (!response.ok) {
      throw new Error("Failed to update task");
    }
    const updatedTask = await response.json();
    return updatedTask;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};


export const deleteTask = async (taskId: number) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};


export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const tasks: Task[] = await response.json();
    return tasks;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const users = await response.json();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };

  export const getTasksByPriority = async (priority: string): Promise<Task[]> => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/priority/${priority}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch tasks by priority");
      }
  
      const tasks: Task[] = await response.json();
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks by priority:", error);
      return [];
    }
  };
  
  export const getTasksSortedByStatus = async (): Promise<Task[]> => {
    try {
      const response = await fetch("http://localhost:3000/tasks/sorted-by-status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch tasks sorted by status");
      }
  
      const tasks: Task[] = await response.json();
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks sorted by status:", error);
      return [];
    }
  };
  