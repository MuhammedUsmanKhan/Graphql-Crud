export const typeDefs = /* GraphQL */ `
  #graphql
  type User {
    id: ID!
    fname: String!
    lname: String!
    age: Int
    married: Boolean!
  }

  type Query {
    getAllUsers: [User!]!
    getUserById(id: ID!): User
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(input: UpdateUserInput!): User!
  }
  input CreateUserInput {
    fname: String!
    lname: String!
    age: Int!
    married: Boolean!
  }
  input UpdateUserInput {
    fname: String!
    lname: String!
    age: Int!
    married: Boolean!
  }
`;
