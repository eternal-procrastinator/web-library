import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Alert, Col, Flex, Row } from "antd";

import { BookList } from "@/widgets/BookList";
import { Loader } from "@/widgets/Loader";
import { AddBookModal } from "@/widgets/AddBookModal";
import { StyledButton } from "@/features/StyledButton";
import { PageLayout } from "@/shared/ui/layouts";
import { GET_BOOKS } from "@/shared/api/books";

export const BooksPage = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <Flex style={{ marginTop: 50 }} justify="center">
        <Alert message="Books download error" type="error" />;
      </Flex>
    );
  }

  return (
    <PageLayout title="My library">
      <Flex justify="center" align="center" style={{ marginBottom: 24 }}>
        <StyledButton type="primary" onClick={() => setIsModalOpen(true)}>
          Add book
        </StyledButton>
      </Flex>

      <AddBookModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

      <Row justify="center">
        <Col xs={22} sm={24}>
          <BookList books={data.books} />
        </Col>
      </Row>
    </PageLayout>
  );
};
