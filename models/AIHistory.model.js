const mongoose = require("mongoose");

const AIHistorySchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        endpoint: {
            type: String,
            required: true,
            enum: ['generate-text', 'analyze-sentiment', 'summarize', 'translate', 'embeddings']
        },
        input: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        output: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        processingTime: {
            type: Number, 
            default: 0
        },
        status: {
            type: String,
            enum: ['success', 'error'],
            default: 'success'
        },
        errorMessage: {
            type: String
        }
    },
    {
        timestamps: true
    }
);


AIHistorySchema.index({ userId: 1, createdAt: -1 });
AIHistorySchema.index({ endpoint: 1 });

const AIHistory = mongoose.models.AIHistory || mongoose.model("AIHistory", AIHistorySchema);
module.exports = AIHistory;
