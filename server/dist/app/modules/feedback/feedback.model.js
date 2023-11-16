"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feedback = exports.feedbackSchema = void 0;
const mongoose_1 = require("mongoose");
exports.feedbackSchema = new mongoose_1.Schema({
    feedback_for: {
        type: String,
        required: true,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    trip_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user',
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
        default: 'pending',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Feedback = (0, mongoose_1.model)('Feedback', exports.feedbackSchema);
