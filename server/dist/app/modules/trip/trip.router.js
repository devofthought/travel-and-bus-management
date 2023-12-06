"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const trip_controller_1 = require("./trip.controller");
const trip_validation_1 = require("./trip.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), trip_controller_1.TripController.getAllTrip); //done testing
router.get('/up-coming', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), trip_controller_1.TripController.getUpComingTrip); //done testing // for user dashboard // upcoming-trip and complete trip
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(trip_validation_1.TripValidation.createTripZodSchema), trip_controller_1.TripController.createTrip);
router.get('/update-able-trip', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), trip_controller_1.TripController.getAllUpdateAbleTrip);
router.patch('/:id', (0, validateRequest_1.default)(trip_validation_1.TripValidation.updateTripZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), trip_controller_1.TripController.updateTrip); //done testing
router.get('/:id', trip_controller_1.TripController.getSingleTrip);
/* public API */
router.post('/get-trips-by-users', (0, validateRequest_1.default)(trip_validation_1.TripValidation.getTripsByUsers), trip_controller_1.TripController.getTripsByUsersController);
router.post('/get-bus-seat-status-on-trip', trip_controller_1.TripController.getBusSeatStatusOnTripController);
exports.TripRoutes = router;
