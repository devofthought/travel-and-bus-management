"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackRoutes = void 0;
const express_1 = __importDefault(require("express"));
const feedback_validation_1 = require("./feedback.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const feedback_controller_1 = require("./feedback.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER, user_1.ENUM_USER_ROLE.ADMIN), feedback_controller_1.FeedbackController.getAllFeedback); // TODO: user and admin can
router.get('/approved-feedbacks', feedback_controller_1.FeedbackController.getApprovedFeedbacks); // Publish
router.post('/', (0, auth_1.default)(user_1.ENUM_USER_ROLE.USER), (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.createFeedbackZodSchema), feedback_controller_1.FeedbackController.createFeedback);
router.patch('/admin-approved-feedback', (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.adminApprovedFeedbackZodSchema), feedback_controller_1.FeedbackController.updateAdminApprovedFeedback);
// TODO: feedback update is not yet implemented for both (admin and user)
router.patch('/:id', (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.updateFeedbackZodSchema), feedback_controller_1.FeedbackController.updateFeedback);
router.get('/:user_id', feedback_controller_1.FeedbackController.getSingleUserFeedback); // TODO: admin can get this data
router.delete('/:id', feedback_controller_1.FeedbackController.deleteFeedback);
exports.FeedbackRoutes = router;
