"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upComingTripFilterableFields = exports.upComingTripSearchableFields = exports.tripFilterableFields = exports.tripSearchableFields = exports.active_status = exports.trips_status = void 0;
exports.trips_status = ['pending', 'on-processing', 'completed'];
exports.active_status = ['active', 'inactive'];
exports.tripSearchableFields = ['ticket_price', 'bus_code', 'route_code'];
exports.tripFilterableFields = [
    'route_code',
    'bus_code',
    'ticket_price',
    'trips_status',
];
exports.upComingTripSearchableFields = ['departure_time'];
exports.upComingTripFilterableFields = ['from', 'to', 'departure_time'];
