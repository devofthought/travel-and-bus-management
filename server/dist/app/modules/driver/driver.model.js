"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = exports.driverSchema = void 0;
const mongoose_1 = require("mongoose");
const driver_constants_1 = require("./driver.constants");
exports.driverSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    driver_code: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    driving_license: {
        type: String,
        required: true,
    },
    years_experience: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    joining_date: {
        type: String,
        required: true,
    },
    /*
    export const driving_status = ['on-trip', 'rest', 'ready', 'sick']
    */
    // driving_status: {
    //   type: String,
    //   required: true,
    //   enum: driving_status,
    // },
    availability_status: [
        {
            status: {
                type: String,
                enum: driver_constants_1.driving_status,
            },
            date: String,
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Driver = (0, mongoose_1.model)('Driver', exports.driverSchema);
