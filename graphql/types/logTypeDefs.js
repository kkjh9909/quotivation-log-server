const { gql } = require('apollo-server-express');

const logTypeDefs = gql`
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

  input LogFilterInput {
    ip: String
    level: String
    path: String
    message: String
    query: String
    parameter: String
  }

  type Query {
    logs: [Log]
    log(id: ID!): Log
    searchLogs(filter: LogFilterInput, range: String, page: Int, size: Int): [Log]
  }

  type Mutation {
    createLog(input: LogInput!): Log
    deleteLog(id: ID!): String
  }

  scalar JSON
`;

module.exports = logTypeDefs;