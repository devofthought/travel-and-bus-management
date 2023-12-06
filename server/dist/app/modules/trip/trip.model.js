"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = exports.tripSchema = void 0;
const mongoose_1 = require("mongoose");
const trip_constants_1 = require("./trip.constants");
exports.tripSchema = new mongoose_1.Schema({
    route_code: {
        type: String,
        required: true,
    },
    route_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Route',
        required: true,
    },
    departure_time: {
        type: String,
        required: true,
    },
    arrival_time: {
        type: String,
        required: true,
    },
    bus_code: {
        type: String,
        ref: 'Bus',
        required: true,
    },
    bus_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Bus',
    },
    ticket_price: {
        type: Number,
        required: true,
    },
    seats_available: {
        type: Number,
        required: true,
    },
    active_status: {
        type: String,
        required: true,
        enum: trip_constants_1.active_status,
    },
    driver_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Driver',
    },
    driver_code: {
        type: String,
        ref: 'Driver',
        required: true,
    },
    trips_status: {
        type: String,
        required: true,
        enum: trip_constants_1.trips_status,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Trip = (0, mongoose_1.model)('Trip', exports.tripSchema);
