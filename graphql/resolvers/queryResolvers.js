const Log = require('../../models/Log');

const queryResolvers = {
    Query: {
        searchLogs: async (_, { filter, range, page, size }) => {
            const query = {};

            if (filter.query)
                query.parameters.query = filter.query;

            if (filter.ip)
                query.ip = filter.ip;

            if (filter.status)
                query.status = filter.status;

            if (filter === "all") { }
            else if (filter.level === "error")
                query.$expr = { $gte: [{ $toInt: { $ifNull: ["$status", "0"] } }, 300,], };
            else if (filter?.path)
                query.uri = { $regex: filter.path, $options: "i" };

            if (filter.message)
                query.message = { $regex: filter.message, $options: "i" };  // 대소문자 구분 없이 검색

            // range에 따른 날짜 필터링
            if (range) {
                const now = new Date();
                if (range === "1h")
                    query.timestamp = { $gte: new Date(now.getTime() - 60 * 60 * 1000) }; // 최근 1시간
                else if (range === "6h")
                    query.timestamp = { $gte: new Date(now.getTime() - 6 * 60 * 60 * 1000) }; // 최근 6시간
                else if (range === "24h")
                    query.timestamp = { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) }; // 최근 24시간
                else if (range === "7d")
                    query.timestamp = { $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) }; // 최근 7일
                else if (range === "30d")
                    query.timestamp = { $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) }; // 최근 30일
            }

            // 페이지네이션 처리
            const pageNum = page || 0;
            const pageSize = size || 10;

            // MongoDB에서 데이터를 가져와서 변환
            const logs = await Log.find(query)
                .sort({ timestamp: -1})
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
}

module.exports = queryResolvers;