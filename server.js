const express = require('express');
const mongoose = require('mongoose');
const server = require('./graphql'); // Apollo Server 설정이 있는 파일
const Log = require('./models/Log');

// MongoDB 연결 설정
const MONGO_URI = 'mongodb+srv://kkjh990957:BOZCU7ZO2LvHLHv9@cluster.yysu2.mongodb.net/app_log?retryWrites=true&w=majority&appName=Cluster'; // MongoDB 주소

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Express 앱 초기화
const app = express();

// Apollo Server를 Express에 연결
server.start().then(() => {
  server.applyMiddleware({ app }); // Apollo Server 미들웨어 추가

  const PORT = 4000; // 서버 포트 설정
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
  });
});
