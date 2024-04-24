import { Request } from "express";

export default interface AuthRequest extends Request {
    user?: string; // Update the type of user property as needed
}