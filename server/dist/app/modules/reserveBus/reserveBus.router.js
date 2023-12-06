"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReserveBusRoutes = void 0;
const express_1 = __importDefault(require("express"));
const reserveBus_validation_1 = require("./reserveBus.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const reserveBus_controller_1 = require("./reserveBus.controller");
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), reserveBus_controller_1.ReserveBusController.getAllReserveBus);
router.post('/', (0, validateRequest_1.default)(reserveBus_validation_1.ReserveBusValidation.createReserveBusZodSchema), reserveBus_controller_1.ReserveBusController.reserveBusRequest);
router.patch('/:id', (0, validateRequest_1.default)(reserveBus_validation_1.ReserveBusValidation.updateReserveBusZodSchema), reserveBus_controller_1.ReserveBusController.updateReserveBus);
router.get('/:user_id', reserveBus_controller_1.ReserveBusController.getSingleUserReserveBus);
router.delete('/:id', reserveBus_controller_1.ReserveBusController.deleteReserveBus);
exports.ReserveBusRoutes = router;
