const { gql } = require('apollo-server-express');

const queryTypeDefs = gql`
  type Query {
    logs: [Log]
    log(id: ID!): Log
    searchLogs(filter: LogFilterInput, range: String, page: Int, size: Int): [Log]
  }
`;

module.exports = queryTypeDefs;
