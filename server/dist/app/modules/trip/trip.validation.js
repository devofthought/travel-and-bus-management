"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripValidation = void 0;
const zod_1 = require("zod");
const createTripZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        route_code: zod_1.z.string({
            required_error: 'route_code status is required',
        }),
        departure_time: zod_1.z.string({
            required_error: 'departure time is required',
        }),
        arrival_time: zod_1.z.string({
            required_error: 'arrival time is required',
        }),
        bus_code: zod_1.z.string({
            required_error: 'bus code is required',
        }),
        ticket_price: zod_1.z.number({
            required_error: 'ticket price is required',
        }),
        trips_status: zod_1.z.string({
            required_error: 'trips status is required',
        }),
        driver_id: zod_1.z.string({
            required_error: 'driver id is required',
        }),
    }),
});
const updateTripZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        route_code: zod_1.z
            .string({
            required_error: 'route code status is required',
        })
            .optional(),
        departure_time: zod_1.z
            .string({
            required_error: 'departure time is required',
        })
            .optional(),
        arrival_time: zod_1.z
            .string({
            required_error: 'arrival time is required',
        })
            .optional(),
        bus_code: zod_1.z
            .string({
            required_error: 'bus code is required',
        })
            .optional(),
        ticket_price: zod_1.z
            .number({
            required_error: 'ticket price is required',
        })
            .optional(),
        trips_status: zod_1.z
            .string({
            required_error: 'trips status is required',
        })
            .optional(),
        driver_id: zod_1.z
            .string({
            required_error: 'driver id is required',
        })
            .optional(),
    }),
});
const getTripsByUsers = zod_1.z.object({
    body: zod_1.z.object({
        to: zod_1.z.string({
            required_error: 'to is required',
        }),
        departure_time: zod_1.z.string({
            required_error: 'departure time is required',
        }),
        from: zod_1.z.string({
            required_error: 'from time is required',
        }),
    }),
});
exports.TripValidation = {
    createTripZodSchema,
    updateTripZodSchema,
    getTripsByUsers
};
