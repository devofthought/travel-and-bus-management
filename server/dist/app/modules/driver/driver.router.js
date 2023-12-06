"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const driver_controller_1 = require("./driver.controller");
const driver_validation_1 = require("./driver.validation");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), driver_controller_1.DriverController.getAllDrivers);
router.patch('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(driver_validation_1.DriverValidation.updateDriverZodSchema), driver_controller_1.DriverController.updateDriver);
router.get('/:id', driver_controller_1.DriverController.getSingleDriver);
router.post('/get-available-drivers', (0, validateRequest_1.default)(driver_validation_1.DriverValidation.CheckDriverAvailableZodSchema), driver_controller_1.DriverController.getAvailableDriverController);
exports.DriverRouter = router;
