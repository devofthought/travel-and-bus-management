"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const createTravelerZodSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        confirm_password: zod_1.z.string({
            required_error: 'confirm password is required',
        }),
    })
        .refine(data => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ['confirm_password'],
    }),
});
const createDriverZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        age: zod_1.z.number({
            required_error: 'age is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        phone: zod_1.z
            .string({
            required_error: 'phone is required',
        })
            .optional(),
        driving_license: zod_1.z.string({
            required_error: 'Driving License code is required',
        }),
        years_experience: zod_1.z.number({
            required_error: 'Years of experience is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
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
    }),
});
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required', //TODO: check email checking is working perfectly or not 
        }),
        phone: zod_1.z.string({
            required_error: 'phone is required',
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
    }),
});
const loginUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'refreshToken is required',
        }),
    }),
});
exports.authValidation = {
    createTravelerZodSchema,
    createDriverZodSchema,
    createAdminZodSchema,
    loginUserZodSchema,
    refreshTokenZodSchema,
};
