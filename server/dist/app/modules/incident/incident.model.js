"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incident = exports.incidentSchema = void 0;
const mongoose_1 = require("mongoose");
const incident_constants_1 = require("./incident.constants");
exports.incidentSchema = new mongoose_1.Schema({
    bus_code: { type: String, required: true },
    description: { type: String, required: false },
    bus_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Bus' },
    cost: { type: Number },
    servicing_status: { type: String, enum: incident_constants_1.status, default: 'pending' },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Incident = (0, mongoose_1.model)('Incident', exports.incidentSchema);
