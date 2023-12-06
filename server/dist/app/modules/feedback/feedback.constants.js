"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackStatus = exports.feedbackFor = exports.feedbackFilterableFields = exports.feedbackSearchableFields = void 0;
exports.feedbackSearchableFields = [
    'trip_id',
    'user_id',
    'rating',
    'status',
];
exports.feedbackFilterableFields = [
    'searchTerm',
    'trip_id',
    'user_id',
    'rating',
    'status',
];
exports.feedbackFor = ['driver', 'bus', 'trip'];
exports.feedbackStatus = ['pending', 'approved', 'rejected'];
