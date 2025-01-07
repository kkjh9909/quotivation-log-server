const { mergeTypeDefs } = require('@graphql-tools/merge');
const queryTypeDefs = require('./queryTypeDefs');
const mutationTypeDefs = require('./mutationTypeDefs');
const logTypeDefs = require('./logTypeDefs')

const typeDefs = mergeTypeDefs([queryTypeDefs, mutationTypeDefs, logTypeDefs]);

module.exports = typeDefs;