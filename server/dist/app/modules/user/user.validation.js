"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(['user', 'admin']).optional(),
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
    }),
});
const updateUserEmailUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        old_email: zod_1.z.string(),
        new_email: zod_1.z
            .string()
            .refine(value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
            message: 'Invalid email format',
        }),
    }),
});
const updateUserPasswordUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        old_password: zod_1.z.string(),
        new_password: zod_1.z.string(),
        confirm_new_password: zod_1.z.string(),
    }),
});
exports.userValidation = {
    updateUserZodSchema,
    updateUserEmailUpdateZodSchema,
    updateUserPasswordUpdateZodSchema,
};
