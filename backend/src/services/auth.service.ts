import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/jwt";

const prisma = new PrismaClient();

export class AuthService {
  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword } as { name: string; email: string; password: string },
    });

    const token = generateToken(user.id);
    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ 
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
