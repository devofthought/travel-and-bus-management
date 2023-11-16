"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteValidation = void 0;
const zod_1 = require("zod");
const createRouteZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        from: zod_1.z.string({
            required_error: 'from is required',
        }),
        to: zod_1.z.string({
            required_error: 'to is required',
        }),
        distance: zod_1.z.number({
            required_error: 'distance is required',
        }),
    }),
});
const updateRouteZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        from: zod_1.z
            .string({
            required_error: 'from is required',
        })
            .optional(),
        to: zod_1.z
            .string({
            required_error: 'to is required',
        })
            .optional(),
        distance: zod_1.z
            .number({
            required_error: 'distance is required',
        })
            .optional(),
    }),
});
exports.RouteValidation = {
    createRouteZodSchema,
    updateRouteZodSchema,
};
