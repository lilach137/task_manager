import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const result = await this.authService.register(name, email, password);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: "Somthing wrong plese try again" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid credentials" });
    }
  }
}
