import express from "express";
import { TaskController } from "./controllers/task.controller";
import { UserController } from "./controllers/user.controller";
import cors from 'cors';

const app = express();
app.use(cors({origin: "http://localhost:5173"}));
const taskController = new TaskController();
const userController = new UserController();

app.use(express.json());

// Task routes
app.get("/tasks", (req, res) => taskController.getAllTasks(req, res));
app.get("/tasks/priority/:priority", async (req, res) => {await taskController.getTasksByPriority(req, res);});
app.get("/tasks/sorted-by-status", async (req, res) => { await taskController.getTasksSortedByStatus(req, res)});
app.post("/tasks", (req, res) => taskController.createTask(req, res));
app.put("/tasks/:id", (req, res) => taskController.updateTask(req, res));
app.delete("/tasks/:id", (req, res) => taskController.deleteTask(req, res));


// User routes
app.get("/users", (req, res) => userController.getAllUsers(req, res));
app.post("/users", (req, res) => userController.registerUser(req, res));
app.post("/login", (req, res) => userController.loginUser(req, res));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});