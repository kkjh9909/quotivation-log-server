const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const schema = require('./graphql/index');
const dotenv = require('dotenv')

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // MongoDB 주소

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Express 앱 초기화
const app = express();

const server = new ApolloServer({ schema });

// Apollo Server를 Express에 연결
server.start().then(() => {
  server.applyMiddleware({ app }); // Apollo Server 미들웨어 추가

  const PORT = 4000; // 서버 포트 설정
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
});
