import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query {
    books {
      id
      title
      author
      year
      coverImage
    }
  }
`;

const GET_BOOK = gql`
  query GetBook($id: Int!) {
    book(id: $id) {
      id
      title
      author
      year
      genre
      description
      coverImage
    }
  }
`;

const CREATE_BOOK = gql`
  mutation CreateBook($data: CreateBookInput!) {
    createBook(data: $data) {
      id
      title
      author
      year
      genre
      description
      coverImage
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook($id: Int!, $data: UpdateBookInput!) {
    updateBook(id: $id, data: $data) {
      id
      title
      author
      year
      genre
      description
      coverImage
    }
  }
`;

const DELETE_BOOK = gql`
  mutation DeleteBook($id: Int!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export { GET_BOOKS, GET_BOOK, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK };
