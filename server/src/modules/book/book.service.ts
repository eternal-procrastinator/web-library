import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateBookInput } from "./dto/create.input";
import { UpdateBookInput } from "./dto/update.input";
import { Book } from "./entities/book.entity";
import { User } from "@/modules/auth/entities/user.entity";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll(userId: number): Promise<Book[]> {
    const result = await this.bookRepository.find({
      where: { user: { id: userId } },
    });
    
    return result;
  }

  async findOne(id: number, userId: number): Promise<Book | null> {
    const book = await this.bookRepository.findOne({
      where: { id, user: { id: userId } },
    });

    return book;
  }

  async create(data: CreateBookInput, userId: number): Promise<Book> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException("User is not found");
    }
  
    const newBook = this.bookRepository.create({ ...data, user });
    return this.bookRepository.save(newBook);
  }

  async update(id: number, data: UpdateBookInput, userId: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ["user"] });

    if (!book) {
      throw new NotFoundException(`Book with id=${id} is not found`);
    }
    if (book.user.id !== userId) {
      throw new ForbiddenException("You can't delete this book");
    }
  
    Object.assign(book, data);
    return this.bookRepository.save(book);
  }

  async delete(id: number, userId: number): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ["user"] });

    if (!book) {
      throw new NotFoundException(`Book with id=${id} is not found`);
    }
    if (book.user.id !== userId) {
      throw new ForbiddenException("You can't delete this book");
    }

    const deletedBook = await this.bookRepository.remove(book);
    return { ...deletedBook, id };
  }
}
