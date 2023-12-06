"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReserveBus = exports.ReserveBusSchema = void 0;
const mongoose_1 = require("mongoose");
const reserveBus_constants_1 = require("./reserveBus.constants");
exports.ReserveBusSchema = new mongoose_1.Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    departure_time: { type: Date, required: true },
    arrival_time: { type: Date, required: true },
    name: { type: String, required: true },
    bus_type: { type: String, required: true },
    bus_seats: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    bus_code: { type: String },
    total_price: { type: Number },
    driver_ids: { type: [String] },
    status: { type: String, enum: reserveBus_constants_1.status, default: 'pending' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ReserveBus = (0, mongoose_1.model)('ReserveBus', exports.ReserveBusSchema);
