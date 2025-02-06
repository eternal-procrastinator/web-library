import { User } from "@/modules/auth/entities/user.entity";
import { Request } from "express";

declare module "express" {
  export interface Request {
    user?: User;
  }
}
