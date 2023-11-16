"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentValidation = void 0;
const zod_1 = require("zod");
const incident_constants_1 = require("./incident.constants");
const createIncidentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        bus_code: zod_1.z.string({
            required_error: 'bus_code is required',
        }),
        servicing_status: zod_1.z.enum([...incident_constants_1.status]).optional(),
        description: zod_1.z
            .string({
            required_error: 'description  is required',
        })
            .optional(),
        cost: zod_1.z.number({
            required_error: 'cost  is required',
        }),
    }),
});
const updateIncidentZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        bus_code: zod_1.z.string().optional(),
        avaliable_seats: zod_1.z.number().optional(),
        description: zod_1.z.string().optional(),
        cost: zod_1.z.number().optional(),
        servicing_staus: zod_1.z.enum([...incident_constants_1.status]).optional(),
    }),
});
exports.IncidentValidation = {
    createIncidentZodSchema,
    updateIncidentZodSchema,
};
