"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = exports.feedbackSchema = void 0;
const mongoose_1 = require("mongoose");
const feedback_constants_1 = require("./feedback.constants");
exports.feedbackSchema = new mongoose_1.Schema({
    feedback_for: {
        type: String,
        required: true,
        enum: feedback_constants_1.feedbackFor,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    trip_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Trip',
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: feedback_constants_1.feedbackStatus,
        default: 'pending',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Feedback = (0, mongoose_1.model)('Feedback', exports.feedbackSchema);
