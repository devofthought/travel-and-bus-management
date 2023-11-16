"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReserveBusValidation = void 0;
const zod_1 = require("zod");
const reserveBus_constants_1 = require("./reserveBus.constants");
const createReserveBusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        from: zod_1.z.string({
            required_error: 'from is required',
        }),
        to: zod_1.z.string({
            required_error: 'to is required',
        }),
        departure_time: zod_1.z.string({
            required_error: 'departure_time  is required',
        }),
        arrival_time: zod_1.z.string({
            required_error: 'departure_time  is required',
        }),
        email: zod_1.z.string({
            required_error: 'email  is required',
        }),
        phone: zod_1.z.string({
            required_error: 'phone  is required',
        }),
        user_id: zod_1.z.string({
            required_error: 'user_id is required',
        }),
    }),
});
const updateReserveBusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        from: zod_1.z.string().optional(),
        to: zod_1.z.string().optional(),
        departure_time: zod_1.z.string().optional(),
        arrival_time: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        user_id: zod_1.z.string().optional(),
        bus_code: zod_1.z.string().optional(),
        total_price: zod_1.z.number().optional(),
        driver_ids: zod_1.z.array(zod_1.z.string()).optional(),
        status: zod_1.z.enum([...reserveBus_constants_1.status]).optional(),
    }),
});
exports.ReserveBusValidation = {
    createReserveBusZodSchema,
    updateReserveBusZodSchema,
};
