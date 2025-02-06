import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { User } from "./entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(email: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) throw new UnauthorizedException("Email is already registered");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword });
    await this.userRepository.save(user);

    return this.generateToken(user.id);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    const isValid = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !isValid) {
      throw new UnauthorizedException("Incorrect credentials");
    }
    return this.generateToken(user.id);
  }

  private generateToken(userId: number): string {
    return this.jwtService.sign({ id: userId });
  }
}
