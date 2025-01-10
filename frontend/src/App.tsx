import React, { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import TaskDialog from "./components/TaskDialog";
import { Task } from "./types/ITask";
import { fetchUsers, addTask, updateTask, deleteTask, getTasksByPriority } from "./API";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./components/LoginPage";
import "./App.css"
import "./style/TaskTableStyle.css"
import TaskSidebar from "./components/TaskSideBar";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<string>("All");
  const [currentStatusFilter, setCurrentStatusFilter] = useState<string>("All");
  const location = useLocation();
  const [isTasksPageActive, setIsTasksPageActive] = useState(false);

  useEffect(() => {
    if (location.pathname === "/tasks") {
      setIsTasksPageActive(true);
      setSelectedPriority("All");
      setCurrentStatusFilter("All");
    } else {
      setIsTasksPageActive(false);
    }
  }, [location,isTasksPageActive]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isTasksPageActive) {
      loadUsers();
    }
  }, [isTasksPageActive]);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      const storedUserData = JSON.parse(localStorageUser);
      const user = users.find((u) => u.id === storedUserData.id);
  
      if (user) {
        setCurrentUser(user);
      }
    }
  }, [users, isTasksPageActive]);
  

  useEffect(() => {
    const loadAndFilterTasks = async () => {
      try {
        const fetchedTasks = await getTasksByPriority("All");
        setTasks(fetchedTasks);

        if (selectedPriority === "All") {
          setFilteredTasks(fetchedTasks);
        } else {
          setFilteredTasks(fetchedTasks.filter((task) => task.priority === selectedPriority));
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
    };

    if (isTasksPageActive) {
      loadAndFilterTasks();
    }
  }, [selectedPriority, isTasksPageActive]);

  const handleSaveTask = async () => {
    if (!currentTask || !validateForm(currentTask)) {
      alert("Please fill out all fields correctly.");
      return;
    }
    //edit mode
    if (currentTask.id) {
      await updateTask(currentTask);
      setTasks((prev) =>
        prev.map((t) => (t.id === currentTask.id ? currentTask : t))
      );
      setFilteredTasks((prev) =>
        prev.map((t) => (t.id === currentTask.id ? currentTask : t))
      );
    } else {
      currentTask.id = Math.floor(Math.random() * 1000000);
      const assigneeUser = users.find((user) => user.name === currentTask.assignee);
      if (assigneeUser) {
        const taskWithAssigneeId = { ...currentTask, assigneeId: assigneeUser.id };
        try {
          const newTaskAdded = await addTask(taskWithAssigneeId);
          if (newTaskAdded) {
            newTaskAdded.assignee = assigneeUser.name;
            setTasks((prevTasks) => [...prevTasks, newTaskAdded]);

            if (currentStatusFilter === "All" || currentStatusFilter === newTaskAdded.status) {
              setFilteredTasks((prevFilteredTasks) => [
                ...prevFilteredTasks,
                newTaskAdded,
              ]);
            }
          }
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    }

    const updatedUsers = await fetchUsers();
    setUsers(updatedUsers);
    setDialogOpen(false);
  };


  const validateForm = (task: Task | null) => {
    return (
      task &&
      task.description &&
      task.priority !== "Priority" &&
      task.status !== "Status" &&
      task.date &&
      task.assignee
    );
  };

  const handlePriorityChange = (priority: string) => {
    setSelectedPriority(priority);
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
        await deleteTask(taskId);
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
        setFilteredTasks((prev) => prev.filter((t) => t.id !== taskId));

    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  
  const handleFilterByStatus = (status: string) => {
    setCurrentStatusFilter(status);
    try {
      if (status === "All") {
        setFilteredTasks(tasks);
      } else {
        const filtered = tasks.filter((task) => task.status === status);
        setFilteredTasks(filtered);
      }
    } catch (error) {
      console.error("Error filtering tasks:", error);
    }
  };


  const handleSortByStatus = async () => {
    try {
      const sorted = [...filteredTasks].sort((b, a) => {
        return a.status.localeCompare(b.status);
      });
      setFilteredTasks(sorted);
    } catch (error) {
      console.error("Error sorting tasks:", error);
    }
  }


  return (
      <div className="app-container">
        <h1 className="table-title" color="primary">Task Management App</h1>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route
            path="/tasks"
            element={
              <div>
                <TaskSidebar
                  user={currentUser}
                  onFilterTasks={handleFilterByStatus}
                  onAddTask={() => {
                    setCurrentTask({
                      id: 0,
                      description: "",
                      priority: "",
                      status: "",
                      date: new Date(),
                      assignee: "",
                      assigneeId: 0,
                    });
                    setDialogOpen(true);
                  }}
                />
                <TaskTable
                  tasks={filteredTasks}
                  statusCompleted={false}
                  onEdit={(task) => {
                    setCurrentTask(task);
                    setDialogOpen(true);
                  }}
                  onDelete={handleDeleteTask}
                  onPriorityChange={handlePriorityChange}
                  onSortByStatus={handleSortByStatus}
                />
                {currentTask && (
                  <TaskDialog
                    task={currentTask}
                    users={users}
                    open={dialogOpen}
                    onSave={handleSaveTask}
                    onCancel={() => setDialogOpen(false)}
                    onChange={(task) => setCurrentTask(task)}
                  />
                )}
              </div>
            }
          />
        </Routes>
      </div>
  );
};

export default App;

