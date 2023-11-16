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
const router = express_1.default.Router();
router.get('/', feedback_controller_1.FeedbackController.getAllFeedback);
router.get('/approved-feedbacks', feedback_controller_1.FeedbackController.getApprovedFeedbacks);
router.post('/', (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.createFeedbackZodSchema), feedback_controller_1.FeedbackController.createFeedback);
router.patch('/:id', (0, validateRequest_1.default)(feedback_validation_1.FeedbackValidation.updateFeedbackZodSchema), feedback_controller_1.FeedbackController.updateFeedback);
router.get('/:user_id', feedback_controller_1.FeedbackController.getSingleUserFeedback);
router.delete('/:id', feedback_controller_1.FeedbackController.deleteFeedback);
exports.FeedbackRoutes = router;
