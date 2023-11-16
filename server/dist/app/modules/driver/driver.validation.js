"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverValidation = void 0;
const zod_1 = require("zod");
const createDriverValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'name is required' }),
        driver_code: zod_1.z.string({ required_error: 'code is required' }),
        image: zod_1.z.string({ required_error: 'image is required' }).optional(),
        age: zod_1.z.number({ required_error: 'age is required' }),
        email: zod_1.z.string({ required_error: 'email is required' }),
        phone: zod_1.z.string({ required_error: 'phone is required' }),
        driving_license: zod_1.z.string({
            required_error: 'driving license is required',
        }),
        years_experience: zod_1.z.number({
            required_error: 'years experience is required',
        }),
        address: zod_1.z.string({ required_error: 'address is required' }).optional(),
        joining_date: zod_1.z.string({ required_error: 'joining date is required' }),
        availability_status: zod_1.z
            .array(zod_1.z.object({
            // Define properties inside the availability_status object
            date: zod_1.z.string({
                required_error: 'Availability status date is required',
            }),
            status: zod_1.z.string({
                required_error: 'Availability status is required',
            }),
        }))
            .optional(), // Making availability_status optional
    }),
});
// Define the Zod schema for updating student
const updateDriverZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        driver_id: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        email: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        driving_licence: zod_1.z.number().optional(),
        years_exprience: zod_1.z.number().optional(),
    }),
});
const CheckDriverAvailableZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        departure_time: zod_1.z.string({
            required_error: 'Brand name is required',
        }),
        arrival_time: zod_1.z
            .string({
            required_error: 'Brand name is required',
        })
            .optional(),
    }),
});
exports.DriverValidation = {
    createDriverValidation,
    updateDriverZodSchema,
    CheckDriverAvailableZodSchema,
};
