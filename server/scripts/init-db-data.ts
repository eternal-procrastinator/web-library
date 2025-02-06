import "reflect-metadata";
import { DataSource } from "typeorm";
import axios from "axios";
import * as bcrypt from "bcryptjs";

import { User } from "../src/modules/auth/user.entity";
import { Book } from "../src/modules/book/book.entity";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [User, Book],
  synchronize: true,
});

async function fetchBooksFromAPI(): Promise<Partial<Book>[]> {
  const response = await axios("https://openlibrary.org/search.json?q=Fiction&limit=10");

  return response.data.docs.map((book: any) => ({
    title: book.title,
    author: book.author_name?.[0] || "Unknown author",
    year: book.first_publish_year || 0,
    genre: "Fiction",
    coverImage: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg` : null,
  }));
}

async function seedDatabase() {
  await AppDataSource.initialize();
  console.log("Connected to the database!");

  const userRepository = AppDataSource.getRepository(User);
  const bookRepository = AppDataSource.getRepository(Book);

  let user = await userRepository.findOne({ where: { email: "test@example.com" } });
  if (!user) {
    user = userRepository.create({
      email: "test@example.com",
      password: await bcrypt.hash("password123", 10),
    });
    await userRepository.save(user);
    console.log("Test user created!");
  } else {
    console.log("The test user already exists.");
  }

  const books = await fetchBooksFromAPI();
  for (const book of books) {
    const newBook = bookRepository.create({ ...book, user });
    await bookRepository.save(newBook);
  }
  console.log(`${books.length} of books added to the database!`);

  const savedBooks = await bookRepository.find({
    where: { user },
    relations: ["user"],
  });
  console.log("Books saved for the user:", savedBooks);

  await AppDataSource.destroy();
  console.log("Database connection closed.");
}

seedDatabase().catch((err) => {
  console.error("Error during initialization:", err);
});
