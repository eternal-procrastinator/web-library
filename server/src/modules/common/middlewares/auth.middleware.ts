import { Request, Response, NextFunction } from "express";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { verify } from "jsonwebtoken";

import { User } from "@/modules/auth/entities/user.entity";

export class authMiddleware {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token;
    if (!token) return next();
    
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as { id: number };
      const userRepository = this.dataSource.getRepository(User);
      const user = await userRepository.findOne({ where: { id: decoded.id } });

      if (user) {
        req.user = user;
      }
    } catch (err) {
      console.error("Token verification error:", err);
    }
    
    next();
  };
} 
