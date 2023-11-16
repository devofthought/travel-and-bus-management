"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const traveler_controller_1 = require("./traveler.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const traveler_validation_1 = require("./traveler.validation");
const router = express_1.default.Router();
router.get('/', traveler_controller_1.TravelerController.getAllTraveler);
router.patch('/:id', (0, validateRequest_1.default)(traveler_validation_1.TravelerValidation.updateTravelerZodSchema), traveler_controller_1.TravelerController.updateTraveler);
router.get('/:id', traveler_controller_1.TravelerController.getSingleTraveler);
exports.TravelerRoutes = router;
