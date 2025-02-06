import { Resolver, Query, Mutation, Args, Context, GqlExecutionContext } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { Response, Request } from "express";

import { AuthService } from "./auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { User } from "./entities/user.entity";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query(() => User, { nullable: true })
  @UseGuards(AuthGuard)
  me(@Context("req") req: Request): User | null {
    return req.user || null;
  }

  @Mutation(() => String)
  async signup(
    @Args("email") email: string,
    @Args("password") password: string,
    @Context("res") res: Response
  ): Promise<string> {
    const token = await this.authService.register(email, password);
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    return "Registration is successful";
  }

  @Mutation(() => String)
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
    @Context("res") res: Response
  ): Promise<string> {
    const token = await this.authService.login(email, password);
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    return "Authorization is successful";
  }

  @Mutation(() => String)
  logout(@Context("res") res: Response): string {
    res.clearCookie("token");
    return "The output is fulfilled";
  }
}
