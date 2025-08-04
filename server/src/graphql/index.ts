import { ApolloServer } from "@apollo/server";
import { GraphQLScalarType, Kind } from "graphql";
import { User } from "./user";

// DateTime Scalar Resolver
const DateTimeScalar = new GraphQLScalarType({
  name: "DateTime",
  description: "DateTime custom scalar type",

  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  },

  parseValue(value: unknown) {
    if (typeof value === "string" || typeof value === "number") {
      return new Date(value);
    }
    return null;
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

// Add this JSON Scalar
const JSONScalar = new GraphQLScalarType({
  name: "JSON",
  description: "JSON custom scalar type",

  serialize(value) {
    return value;
  },

  parseValue(value) {
    return value;
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.OBJECT) {
      return ast;
    }
    return null;
  },
});

async function createApolloGraphqlServer() {
  const gqlServer = new ApolloServer({
    typeDefs: `
      scalar JSON
      scalar DateTime
      
      ${User.typeDefs}
    `,
    resolvers: {
      JSON: JSONScalar,
      DateTime: DateTimeScalar,
      Query: {
        ...User.resolvers.Query,
      },
      Mutation: {
        // ...User.resolvers.mutations,
        ...User.resolvers.Mutation,
      },
      //   User: {
      //     ...User.resolvers.User,
      //   },
    },
    formatError: (error) => {
      // Log the error for debugging
      console.error("GraphQL Error:", {
        message: error.message,
        path: error.path,
        extensions: error.extensions,
      });

      // Return a clean error message to the client
      return {
        message: error.message,
        path: error.path,
        extensions: {
          code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
        },
      };
    },
  });

  // Start the gql server
  await gqlServer.start();
  return gqlServer;
}

export default createApolloGraphqlServer;
