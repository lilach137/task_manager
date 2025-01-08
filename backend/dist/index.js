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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("./controllers/task.controller");
const user_controller_1 = require("./controllers/user.controller");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: "http://frontend:5173" }));
const taskController = new task_controller_1.TaskController();
const userController = new user_controller_1.UserController();
app.use(express_1.default.json());
// Task routes
app.get("/tasks", (req, res) => taskController.getAllTasks(req, res));
app.get("/tasks/priority/:priority", (req, res) => __awaiter(void 0, void 0, void 0, function* () { yield taskController.getTasksByPriority(req, res); }));
app.get("/tasks/sorted-by-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () { yield taskController.getTasksSortedByStatus(req, res); }));
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
