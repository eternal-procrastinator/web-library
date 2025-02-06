import { gql } from '@apollo/client';

const GET_ME = gql`
  query Me {
    me {
      id,
      email,
    }
  }
`;

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export { LOGIN, SIGNUP, GET_ME };
