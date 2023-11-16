"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = exports.routeSchema = void 0;
const mongoose_1 = require("mongoose");
exports.routeSchema = new mongoose_1.Schema({
    route_code: {
        type: String,
        required: true,
        unique: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Route = (0, mongoose_1.model)('Route', exports.routeSchema);
