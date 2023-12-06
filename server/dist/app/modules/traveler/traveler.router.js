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
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const multer_1 = __importDefault(require("../../middlewares/multer"));
const router = express_1.default.Router();
router.get('/', traveler_controller_1.TravelerController.getAllTraveler);
router.patch('/traveler-profile', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), multer_1.default.single('profile_image'), (0, validateRequest_1.default)(traveler_validation_1.TravelerValidation.updateTravelerZodSchema), traveler_controller_1.TravelerController.updateTraveler);
router.get('/:id', traveler_controller_1.TravelerController.getSingleTraveler);
exports.TravelerRoutes = router;
