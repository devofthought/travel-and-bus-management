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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const feedback_model_1 = require("./feedback.model");
const feedback_constants_1 = require("./feedback.constants");
const createFeedback = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newFeedback = yield feedback_model_1.Feedback.create(payload);
    if (!newFeedback) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Feedback');
    }
    return newFeedback;
});
const getAllFeedback = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: feedback_constants_1.feedbackSearchableFields === null || feedback_constants_1.feedbackSearchableFields === void 0 ? void 0 : feedback_constants_1.feedbackSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const whereCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield feedback_model_1.Feedback.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield feedback_model_1.Feedback.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUserFeedbacks = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.find({ user_id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feedbacks not found!');
    }
    return result;
});
const getApprovedFeedbacks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.find({ status: 'approved' });
    return result;
});
const updateFeedback = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield feedback_model_1.Feedback.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Feedback not found!');
    }
    const result = yield feedback_model_1.Feedback.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteFeedback = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.findOneAndDelete({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feedback not found!');
    }
    return result;
});
exports.FeedbackService = {
    createFeedback,
    getAllFeedback,
    getSingleUserFeedbacks,
    updateFeedback,
    deleteFeedback,
    getApprovedFeedbacks,
};
