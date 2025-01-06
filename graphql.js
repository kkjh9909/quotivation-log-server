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

// GraphQL 리졸버 정의
const resolvers = {
    Query: {
      searchLogs: async (_, { filter, range, page, size }) => {
        // MongoDB 쿼리 조건 객체를 생성
        const query = {};
  
        // filter에 따라서 조건 추가
        if (filter.query) {
          query["parameters.query"] = filter.query;  // parameters.query로 접근
        }
  
        if (filter.ip) {
          query["ip"] = filter.ip;
        }
  
        if (filter.level) {
          query["status"] = filter.level;  // status를 level로 받음
        }
  
        if (filter.message) {
          query["message"] = { $regex: filter.message, $options: "i" };  // 대소문자 구분 없이 검색
        }
  
        // range에 따른 날짜 필터링
        if (range) {
          const now = new Date();
          if (range === "1h") {
            query["timestamp"] = { $gte: new Date(now.getTime() - 60 * 60 * 1000) }; // 최근 1시간
          } else if (range === "1m") {
            query["timestamp"] = { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) }; // 최근 30일
          }
          // 다른 범위 추가 가능
        }
  
        // 페이지네이션 처리
        const pageNum = page || 0;
        const pageSize = size || 10;
  
        // MongoDB에서 데이터를 가져와서 변환
        const logs = await Log.find(query)
            .skip(pageNum * pageSize)
            .limit(pageSize);

    // ISO 8601 형식으로 변환
        return logs.map(log => ({
            id: log._id.toString(),
            ...log.toObject(),
            timestamp: new Date(log.timestamp).toISOString(), // ISO 형식 변환
        }));
      },
    },
  };
  
  


const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
