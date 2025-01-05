import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";

export class UserService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllUsers() {
    return this.prisma.user.findMany({ });
  }

  async register(name: string, email: string, password: string) {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await this.prisma.user.create({
        data: { name, email, password: hashedPassword } as { name: string; email: string; password: string },
      });
  
      const token = generateToken(user.id);
      return { user, token };
    }
  
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      select: { id: true, password: true } as { id: boolean; password: boolean }, 
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id);
    return { user, token };
  }
}
