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
const router = express_1.default.Router();
router.get('/', trip_controller_1.TripController.getAllTrip); //done testing
router.get('/up-coming', trip_controller_1.TripController.getUpComingTrip); //done testing
router.post('/', (0, validateRequest_1.default)(trip_validation_1.TripValidation.createTripZodSchema), trip_controller_1.TripController.createTrip);
router.get('/update-able-trip', trip_controller_1.TripController.getAllUpdateAbleTrip);
router.patch('/:id', (0, validateRequest_1.default)(trip_validation_1.TripValidation.updateTripZodSchema), trip_controller_1.TripController.updateTrip); //done testing
router.get('/:id', trip_controller_1.TripController.getSingleTrip);
router.post('/get-trips-by-users', trip_controller_1.TripController.getTripsByUsersController);
exports.TripRoutes = router;
