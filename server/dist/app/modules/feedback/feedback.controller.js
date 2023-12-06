"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constants/pagination");
const feedback_constants_1 = require("./feedback.constants");
const feedback_services_1 = require("./feedback.services");
const createFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAuth = req.user;
    const result = yield feedback_services_1.FeedbackService.createFeedback(req.body, userAuth);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feedback created successfully!',
        data: result,
    });
}));
const getAllFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, feedback_constants_1.feedbackFilterableFields);
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const user = req.user;
    const result = yield feedback_services_1.FeedbackService.getAllFeedback(user, filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Feedback retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleUserFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield feedback_services_1.FeedbackService.getSingleUserFeedbacks(req.params.user_id, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users all feedback retrieved successfully!',
        meta: result.meta,
        data: result.data,
    });
}));
const getApprovedFeedbacks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_services_1.FeedbackService.getApprovedFeedbacks();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Approved feedbacks retrieved successfully!',
        data: result,
    });
}));
const updateFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield feedback_services_1.FeedbackService.updateFeedback(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feedback updated successfully!',
        data: result,
    });
}));
const updateAdminApprovedFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedData = req.body;
    const result = yield feedback_services_1.FeedbackService.updateAdminApprovedFeedback(updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feedback updated successfully!',
        data: result,
    });
}));
const deleteFeedback = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_services_1.FeedbackService.deleteFeedback(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feedback deleted successfully!',
        data: result,
    });
}));
exports.FeedbackController = {
    createFeedback,
    getAllFeedback,
    getSingleUserFeedback,
    updateFeedback,
    deleteFeedback,
    getApprovedFeedbacks,
    updateAdminApprovedFeedback,
};
