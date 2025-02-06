import React from "react";
import { Col, Flex, Row, Spin } from "antd"

import { BookItem } from "@/features/BookItem";
import { Book } from "@/entities/book";

interface BookListProps {
  books: Book[];
}
export const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <Row gutter={[16, 16]}>
      {books.map((book: Book) => (
        <Col key={book.id} xs={24} sm={12} lg={8}>
          <BookItem key={book.id} book={book} />
        </Col>
      ))}
    </Row>
  );
};
