"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelerValidation = void 0;
const zod_1 = require("zod");
const updateTravelerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'name is required',
        })
            .optional(),
        image: zod_1.z
            .string({
            required_error: 'image is required',
        })
            .optional(),
        age: zod_1.z
            .string({
            required_error: 'Age is required',
        })
            .optional(),
        phone: zod_1.z
            .string({
            required_error: 'phone is required',
        })
            .optional(),
    }),
});
exports.TravelerValidation = {
    updateTravelerZodSchema,
};
