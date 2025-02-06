import { Resolver, Query, Mutation, Args, Context, Int } from "@nestjs/graphql";
import { NotFoundException, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Request } from "express";

import { BookService } from "./book.service";
import { Book } from "./entities/book.entity";
import { CreateBookInput } from "./dto/create.input";
import { UpdateBookInput } from "./dto/update.input";
import { AuthGuard } from "@/modules/auth/guards/auth.guard";

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query(() => [Book])
  @UseGuards(AuthGuard)
  books(@Context("req") req: Request): Promise<Book[]> {
    return this.bookService.findAll(req.user!.id);
  }

  @Query(() => Book, { nullable: true })
  @UseGuards(AuthGuard)
  async book(@Args("id", { type: () => Int }) id: number, @Context("req") req: Request): Promise<Book> {
    const book = await this.bookService.findOne(id, req.user!.id);
    if (!book) {
      throw new NotFoundException(`Book with id=${id} not found`);
    }

    return book;
  }

  @Mutation(() => Book)
  @UseGuards(AuthGuard)
  createBook(@Args("data") data: CreateBookInput, @Context("req") req: Request): Promise<Book> {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException("User is not authorized");
    return this.bookService.create(data, userId);
  }

  @Mutation(() => Book)
  @UseGuards(AuthGuard)
  updateBook(@Args("id", { type: () => Int }) id: number, @Args("data") data: UpdateBookInput, @Context("req") req: Request): Promise<Book> {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException("User is not authorized");

    return this.bookService.update(id, data, userId);
  }

  @Mutation(() => Book)
  @UseGuards(AuthGuard)
  deleteBook(@Args("id", { type: () => Int }) id: number, @Context("req") req: Request): Promise<Book> {
    const userId = req.user?.id;
    if (!userId) throw new UnauthorizedException("User is not authorized");

    return this.bookService.delete(id, userId);
  }
}
