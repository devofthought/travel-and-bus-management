"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = exports.incidentFilterableFields = exports.incidentSearchableFields = void 0;
exports.incidentSearchableFields = ['bus_code', 'servicing_status'];
exports.incidentFilterableFields = [
    'searchTerm',
    'bus_code',
    'servicing_status',
];
exports.status = ['pending', 'on-servicing', 'done'];
