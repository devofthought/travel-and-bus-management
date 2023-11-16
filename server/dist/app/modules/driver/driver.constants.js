"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.driving_status = exports.driverFilterableFields = exports.driverSearchableFields = void 0;
exports.driverSearchableFields = [
    'id',
    'email',
    'phone',
    'name',
    'driving_licence',
    'driving_status',
];
exports.driverFilterableFields = [
    'searchTerm',
    'id',
    'phone',
    'email',
    'driving_licence',
    'years_exprience',
    'driving_status',
];
exports.driving_status = ['on-trip', 'rest', 'ready', 'sick'];
