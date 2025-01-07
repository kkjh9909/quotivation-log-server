const mutationResolvers = require('./mutationResolvers');
const queryResolvers = require('./queryResolvers');

const resolvers = {
  Query: queryResolvers.Query,
  Mutation: mutationResolvers.Mutation,
};

module.exports = resolvers;
