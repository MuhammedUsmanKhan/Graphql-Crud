import { gql } from "@apollo/client";

// parameters of function should same as resolvers params so it can understand.
// createUser this name should be same as resolver function name.

export const Create_User = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      fname
      lname
      age
      married
    }
  }
`;

export const Update_User = gql`
  mutation UpdateUser($id: number, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      fname
      lname
      age
      married
    }
  }
`;
