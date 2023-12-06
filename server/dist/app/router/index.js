"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("../modules/auth/auth.router");
const booking_router_1 = require("../modules/booking/booking.router");
const bus_router_1 = require("../modules/bus/bus.router");
const driver_router_1 = require("../modules/driver/driver.router");
const feedback_router_1 = require("../modules/feedback/feedback.router");
const incident_router_1 = require("../modules/incident/incident.router");
const reserveBus_router_1 = require("../modules/reserveBus/reserveBus.router");
const route_router_1 = require("../modules/route/route.router");
const traveler_router_1 = require("../modules/traveler/traveler.router");
const trip_router_1 = require("../modules/trip/trip.router");
const user_router_1 = require("../modules/user/user.router");
const payment_router_1 = require("../modules/payment/payment.router");
const support_router_1 = require("../modules/support/support.router");
const router = express_1.default.Router();
const moduleRoutes = [
    { path: '/auth', router: auth_router_1.AuthRouter },
    { path: '/users', router: user_router_1.UserRouter },
    { path: '/driver', router: driver_router_1.DriverRouter },
    { path: '/route', router: route_router_1.RouteRoutes },
    { path: '/buses', router: bus_router_1.BusRoutes },
    { path: '/feedback', router: feedback_router_1.FeedbackRoutes },
    { path: '/reserveBus', router: reserveBus_router_1.ReserveBusRoutes },
    { path: '/trips', router: trip_router_1.TripRoutes },
    { path: '/traveler', router: traveler_router_1.TravelerRoutes },
    { path: '/incident', router: incident_router_1.IncidentRoutes },
    { path: '/booking', router: booking_router_1.BookingRoutes },
    { path: '/payment', router: payment_router_1.PaymentRoutes },
    { path: '/support', router: support_router_1.SupportRoutes },
];
moduleRoutes.forEach(route => router.use(route.path, route.router));
exports.default = router;
