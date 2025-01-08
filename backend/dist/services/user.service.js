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
exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = require("@prisma/client");
const jwt_1 = require("../utils/jwt");
class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.user.findMany({});
        });
    }
    register(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield this.prisma.user.create({
                data: { name, email, password: hashedPassword },
            });
            const token = (0, jwt_1.generateToken)(user.id);
            return { user, token };
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.prisma.user.findUnique({
                where: { email },
                select: { id: true, password: true },
            });
            if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
                throw new Error("Invalid credentials");
            }
            const token = (0, jwt_1.generateToken)(user.id);
            return { user, token };
        });
    }
}
exports.UserService = UserService;
