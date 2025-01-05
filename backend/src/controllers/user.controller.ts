import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const result = await this.userService.register(name, email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Somthing wrong plese try again" });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.userService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid credentials" });
    }
  }


}
