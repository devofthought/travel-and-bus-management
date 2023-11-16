"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteRoutes = void 0;
const express_1 = __importDefault(require("express"));
const route_validation_1 = require("./route.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const route_controller_1 = require("./route.controller");
const router = express_1.default.Router();
router.get('/', route_controller_1.RouteController.getAllRoute);
router.post('/', (0, validateRequest_1.default)(route_validation_1.RouteValidation.createRouteZodSchema), route_controller_1.RouteController.createRoute);
router.patch('/:_id', (0, validateRequest_1.default)(route_validation_1.RouteValidation.updateRouteZodSchema), route_controller_1.RouteController.updateRoute);
router.get('/:_id', route_controller_1.RouteController.getSingleRoute);
router.delete('/:_id', route_controller_1.RouteController.deleteRoute);
exports.RouteRoutes = router;
