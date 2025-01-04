const { ApolloServer, gql } = require('apollo-server-express');
const Log = require('./models/Log');

// GraphQL 타입 정의
const typeDefs = gql`
  type Log {
    id: ID!
    method: String!
    uri: String!
    parameters: JSON
    message: String
    ip: String!
    status: String!
    timestamp: String!
    _class: String
  }

  input LogInput {
    method: String!
    uri: String!
    parameters: JSON
    message: String
    ip: String!
    status: String!
    timestamp: String
    _class: String
  }

  type Query {
    logs: [Log]
    log(id: ID!): Log
  }

  type Mutation {
    createLog(input: LogInput!): Log
    deleteLog(id: ID!): String
  }

  scalar JSON
`;

// GraphQL 리졸버 정의
const resolvers = {
  Query: {
    logs: async () => await Log.find(),
    log: async (_, { id }) => await Log.findById(id),
  },
  Mutation: {
    createLog: async (_, { input }) => {
      const newLog = new Log(input);
      return await newLog.save();
    },
    deleteLog: async (_, { id }) => {
      await Log.findByIdAndDelete(id);
      return `Log with ID ${id} deleted`;
    },
  },
};

// Apollo Server 생성
const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
