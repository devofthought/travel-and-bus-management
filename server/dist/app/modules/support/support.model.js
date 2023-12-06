"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Support = exports.supportSchema = void 0;
const mongoose_1 = require("mongoose");
exports.supportSchema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Support = (0, mongoose_1.model)('Support', exports.supportSchema);
