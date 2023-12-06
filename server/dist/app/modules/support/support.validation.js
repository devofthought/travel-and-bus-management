"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportValidation = void 0;
const zod_1 = require("zod");
const createSupportZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        first_name: zod_1.z.string({
            required_error: 'first name is required',
        }),
        email: zod_1.z
            .string()
            .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
            message: 'Invalid email',
        }),
        phone: zod_1.z
            .string({
            required_error: 'phone is required',
        })
            .optional(),
        subject: zod_1.z
            .string({
            required_error: 'subject is not required',
        })
            .optional(),
        last_name: zod_1.z
            .string({
            required_error: 'last name is not required',
        })
            .optional(),
        message: zod_1.z.string({
            required_error: 'message is required',
        }),
    }),
});
exports.SupportValidation = {
    createSupportZodSchema,
};
