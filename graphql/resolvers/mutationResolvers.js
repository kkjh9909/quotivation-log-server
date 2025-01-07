const Log = require('../../models/Log');

const mutationResolvers = {
    Mutation: {
        createLog: async (_, { input }) => {
            try {
                const newLog = new Log({
                    ...input,
                    timestamp: input.timestamp || new Date(), // 타임스탬프가 없으면 현재 시간 설정
                });

                const savedLog = await newLog.save();

                return {
                    id: savedLog._id.toString(),
                    ...savedLog.toObject(),
                    timestamp: savedLog.timestamp.toISOString(), // ISO 포맷 변환
                };
            } catch (error) {
                console.error("Error creating log:", error);
                throw new Error("Failed to create log");
            }
        },
        deleteLog: async (_, { id }) => {
            await Log.findByIdAndDelete(id);
            return `Log with ID ${id} was deleted`;
        },
    }
}

module.exports = mutationResolvers;