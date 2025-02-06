import { Reference, StoreObject, useMutation } from "@apollo/client";
import { Button, Card, Divider, Row } from "antd";
import styled from "styled-components";

import { CardAvatar } from "@/features/CardAvatar";
import { Book } from "@/entities/book";
import { DELETE_BOOK, GET_BOOKS } from "@/shared/api/books";
import { Link } from "react-router-dom";

const StyledP = styled.p`
  font-size: 16px;
  margin-block: 8px;
`;

interface BookItemProps {
  book: Book;
}
export const BookItem: React.FC<BookItemProps> = ({ book }) => {
  const [deleteBook, { loading }] = useMutation(DELETE_BOOK, {
    variables: { id: book.id },
    update: (cache, { data }) => {
      const deletedBookId = data?.deleteBook?.id;
      if (!deletedBookId) return;

      cache.modify({
        fields: {
          books(existingBooks = [], { readField }) {
            return existingBooks.filter((book: Reference | StoreObject | undefined) => readField("id", book) !== deletedBookId);
          }
        }
      });
    },
  });

  return (
    <Card key={book.id} title={<h2 style={{ margin: 0 }}>{book.title}</h2>} style={{ height: "100%" }}>
      <CardAvatar src={book.coverImage} alt={book.title} style={{ marginBottom: 24 }} />

      <StyledP><strong>Author:</strong> {book.author}</StyledP>
      <StyledP><strong>Publish year:</strong> {book.year}</StyledP>

      <Divider style={{ marginBlock: 24 }} />

      <Row justify="space-evenly" gutter={10}>
        <Link to={`/books/${book.id}`}>
          <Button type="primary">
            Read More
          </Button>
        </Link>

        <Button danger onClick={() => deleteBook()} loading={loading}>
          Delete book
        </Button>
      </Row>
    </Card>
  );
};
