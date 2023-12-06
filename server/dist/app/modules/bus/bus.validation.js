"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusValidation = void 0;
const zod_1 = require("zod");
const createBusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        total_seats: zod_1.z.string({
            required_error: 'Available seats is required',
        }),
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
            .optional(),
        brand_name: zod_1.z.string({
            required_error: 'Brand name is required',
        }),
        model: zod_1.z.string({
            required_error: 'Bus model is required',
        }),
        bus_image: zod_1.z
            .string({
            required_error: 'Bus image is required',
        })
            .optional(),
        outer_image: zod_1.z
            .string({
            required_error: 'Outer image is required',
        })
            .optional(),
        inner_image: zod_1.z
            .string({
            required_error: 'Inner image is required',
        })
            .optional(),
    }),
});
const updateBusZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        total_seats: zod_1.z
            .array(zod_1.z.string({
            required_error: 'Available seats is required',
        }))
            .optional(),
        brand_name: zod_1.z
            .string({
            required_error: 'Brand name is required',
        })
            .optional(),
        model: zod_1.z
            .string({
            required_error: 'Brand name is required',
        })
            .optional(),
    }),
});
const CheckBusAvailableZodSchema = zod_1.z.object({
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
const updateBusImageZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        image: zod_1.z
            .string({
            required_error: 'Bus image is required',
        })
            .optional(),
    }),
});
exports.BusValidation = {
    createBusZodSchema,
    updateBusZodSchema,
    updateBusImageZodSchema,
    CheckBusAvailableZodSchema,
};
