import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      fname
      lname
      age
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      fname
      lname
      age
      married
    }
  }
`;
