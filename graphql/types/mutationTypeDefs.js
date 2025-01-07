const { gql } = require('apollo-server-express');

const mutationTypeDefs = gql`
  type Mutation {
    createLog(input: LogInput!): Log
    deleteLog(id: ID!): String
  }
`;

module.exports = mutationTypeDefs;