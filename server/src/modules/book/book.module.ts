import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Book } from "./entities/book.entity";
import { BookService } from "./book.service";
import { BookResolver } from "./book.resolver";
import { User } from "@/modules/auth/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Book, User])],
  providers: [BookService, BookResolver],
})
export class BookModule {}
