"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traveler = void 0;
const mongoose_1 = require("mongoose");
const travelerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: {
        avatar: { type: String },
        avatar_public_url: { type: String },
    },
    age: { type: Number },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
});
exports.Traveler = (0, mongoose_1.model)('Traveler', travelerSchema);
