"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidation = void 0;
const zod_1 = require("zod");
const createFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        feedback_for: zod_1.z.string({
            required_error: 'feedback_for is required',
        }),
        trip_id: zod_1.z.string({
            required_error: 'trip_id is required',
        }),
        feedback: zod_1.z.string({
            required_error: 'feedback is required',
        }),
        rating: zod_1.z
            .number({
            required_error: 'rating is required',
        })
            .max(5, {
            message: 'Rating must be at most 5',
        }),
    }),
});
const updateFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        feedback_for: zod_1.z.string().optional(),
        user_id: zod_1.z.string().optional(),
        trip_id: zod_1.z.string().optional(),
        feedback: zod_1.z.string().optional(),
        rating: zod_1.z.string().optional(),
        status: zod_1.z.string().optional(),
    }),
});
const adminApprovedFeedbackZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.string(),
        feedback_id: zod_1.z.string(),
    }),
});
exports.FeedbackValidation = {
    createFeedbackZodSchema,
    updateFeedbackZodSchema,
    adminApprovedFeedbackZodSchema,
};
