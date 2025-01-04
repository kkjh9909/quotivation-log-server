const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    method: { type: String, required: true }, // HTTP 메서드 (GET, POST 등)
    uri: { type: String, required: true },    // 요청 URI
    parameters: { type: Object, default: {} }, // 요청 파라미터
    message: { type: String },               // 메시지
    ip: { type: String, required: true },    // 클라이언트 IP
    status: { type: String, required: true }, // 상태 코드 (200, 404 등)
    timestamp: { type: Date, default: Date.now }, // 요청 타임스탬프
    _class: { type: String },                // 클래스 정보 (Spring 데이터의 `_class` 필드)
  });

const Log = mongoose.model('Log', logSchema);

module.exports = Log;