"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportRoutes = void 0;
const express_1 = __importDefault(require("express"));
const support_validation_1 = require("./support.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const support_controller_1 = require("./support.controller");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), support_controller_1.SupportController.getAllSupport);
router.post('/', (0, validateRequest_1.default)(support_validation_1.SupportValidation.createSupportZodSchema), support_controller_1.SupportController.createSupport);
exports.SupportRoutes = router;
