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
        const query = {};
  
        if (filter.query)
          query.parameters.query = filter.query;
  
        if (filter.ip)
          query.ip = filter.ip;
    
        if (filter.status)
          query.status = filter.status;

        if (filter === "all") {
            console.log("11")
        }
        else if (filter.level === "error") {
            query.$expr = {
                $gte: [
                    { $toInt: { $ifNull: ["$status", "0"] } },
                    300,
                ],
            };
            console.log("Generated Query:", query); // 쿼리 확인
            console.log("22")
        }
            
        else if (filter?.path) {
            query.uri = { $regex: filter.path, $options: "i" };
            console.log("33")
        }
  
        if (filter.message)
          query.message = { $regex: filter.message, $options: "i" };  // 대소문자 구분 없이 검색
  
        // range에 따른 날짜 필터링
        if (range) {
          const now = new Date();
          if (range === "1h")
            query.timestamp = { $gte: new Date(now.getTime() - 60 * 60 * 1000) }; // 최근 1시간
          else if(range === "6h")
            query.timestamp = { $gte: new Date(now.getTime() - 6 * 60 * 60 * 1000) }; // 최근 6시간
          else if(range === "24h")
            query.timestamp = { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) }; // 최근 24시간
          else if(range === "7d")
            query.timestamp = { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) }; // 최근 7일
          else if(range === "30d")
            query.timestamp = { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) }; // 최근 30일
        }

        
        
            

        console.log(filter)

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

    Mutation: {
        createLog: async (_, { input }) => {
            try {
                // 새로운 로그 생성
                const newLog = new Log({
                    ...input,
                    timestamp: input.timestamp || new Date(), // 타임스탬프가 없으면 현재 시간 설정
                });
    
                // MongoDB에 저장
                const savedLog = await newLog.save();
    
                // 반환 값 설정
                return {
                    id: savedLog._id.toString(),
                    ...savedLog.toObject(),
                    timestamp: savedLog.timestamp.toISOString(), // ISO 포맷 변환
                };
            } catch (error) {
                console.error("Error creating log:", error);
                throw new Error("Failed to create log");
            }
        }
    }
  };
  
  


const server = new ApolloServer({ typeDefs, resolvers });

module.exports = server;
