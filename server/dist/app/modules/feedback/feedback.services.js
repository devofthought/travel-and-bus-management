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
const user_model_1 = require("../user/user.model");
const trip_model_1 = require("../trip/trip.model");
const booking_model_1 = require("../booking/booking.model");
const user_1 = require("../../../enums/user");
const createFeedback = (payload, userAuth) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userAuth.id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'traveler is not found');
    }
    const trip = yield trip_model_1.Trip.findById(payload.trip_id);
    if (!trip) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'trip is not found');
    }
    if (trip.trips_status !== 'completed') {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'trip is not completed');
    }
    /* check traveler is able to add feed or not */
    // const booking = await Booking.find({ trip_id: payload.trip_id })
    const booking = yield booking_model_1.Booking.find({
        $and: [{ travel_id: user.traveler_id }, { trip_id: payload.trip_id }],
    });
    if (booking.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'travel is not able to add feedback on this trip');
    }
    /* check feedback category match or not */
    const feedback = yield feedback_model_1.Feedback.find({
        $and: [{ user_id: user._id }, { trip_id: payload.trip_id }],
    }).select('feedback_for');
    const isMatch = feedback.some(item => item.feedback_for === payload.feedback_for);
    if (isMatch) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'already add feedback on same category');
    }
    if ('status' in payload) {
        delete payload.status;
    }
    const createFeedback = Object.assign(Object.assign({}, payload), { feedback: payload.feedback.trim(), user_id: user._id });
    const newFeedback = yield feedback_model_1.Feedback.create(createFeedback);
    if (!newFeedback) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Feedback');
    }
    return newFeedback;
});
const getAllFeedback = (payload, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
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
    if (payload.role === user_1.ENUM_USER_ROLE.ADMIN) {
        const result = yield feedback_model_1.Feedback.find(whereCondition)
            .sort(sortCondition)
            .skip(skip)
            .limit(limit)
            .populate({
            path: 'trip_id',
            populate: [
                { path: 'driver_id', select: 'driver_code name email age' },
                { path: 'route_id', select: 'from to distance' },
            ],
        })
            .populate({
            path: 'user_id',
            select: 'email traveler_id',
        });
        const total = yield feedback_model_1.Feedback.countDocuments(whereCondition);
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        };
    }
    else if (payload.role === user_1.ENUM_USER_ROLE.USER) {
        const result = yield feedback_model_1.Feedback.find({ user_id: payload.id })
            .sort(sortCondition)
            .skip(skip)
            .limit(limit)
            .select('-status')
            .populate({
            path: 'trip_id',
            populate: [
                { path: 'driver_id', select: 'driver_code name age' },
                { path: 'route_id', select: 'from to distance' },
            ],
        })
            .populate({
            path: 'user_id',
            select: 'email traveler_id',
        });
        const total = yield feedback_model_1.Feedback.countDocuments({ user_id: payload.id });
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        };
    }
    else {
        const result = yield feedback_model_1.Feedback.find({})
            .sort(sortCondition)
            .skip(skip)
            .limit(limit)
            .select('-status');
        const total = yield feedback_model_1.Feedback.countDocuments({});
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: result,
        };
    }
});
const getSingleUserFeedbacks = (user_id, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelper.calculatePagination(paginationOptions);
    const sortCondition = sortBy &&
        sortOrder && { [sortBy]: sortOrder };
    const result = yield feedback_model_1.Feedback.find({ user_id })
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .select('-status')
        .populate({
        path: 'trip_id',
        populate: [
            { path: 'driver_id', select: 'driver_code name age' },
            { path: 'route_id', select: 'from to distance' },
        ],
    })
        .populate({
        path: 'user_id',
        select: 'email traveler_id',
    });
    const total = yield feedback_model_1.Feedback.countDocuments({ user_id });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// const getApprovedFeedbacks = async (): Promise<IApprovedFeedbackResponse[] | null> => {
//   const result = await Feedback.find({ status: 'approved' }).populate({
//     path: 'user_id',
//     select: 'email traveler_id',
//     populate: [{ path: 'traveler_id', select: 'driver_code name email age' }],
//   })
//   if (result.length === 0) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'traveler is not found')
//   }
//   const approvedFeedback = []
//   for (const feedback of result) {
//     approvedFeedback.push({
//       feedback_content: feedback.feedback,
//       name: feedback.user_id?.traveler_id?.name,
//       user_type: 'traveler',
//       user_image: feedback.user_id?.traveler_id?.image,
//       rating: feedback.rating,
//       feedback_for: feedback.feedback_for,
//     })
//   }
//   return approvedFeedback
// }
const getApprovedFeedbacks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield feedback_model_1.Feedback.find({ status: 'approved' })
        .select('-status')
        .populate({
        path: 'user_id',
        select: 'traveler_id',
        populate: [{ path: 'traveler_id', select: 'name image' }],
    });
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
const updateAdminApprovedFeedback = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield feedback_model_1.Feedback.findOne({ _id: payload.feedback_id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Feedback not found!');
    }
    if (!feedback_constants_1.feedbackStatus.includes(payload.status || 'none')) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Try to put wrong status!');
    }
    const result = yield feedback_model_1.Feedback.findOneAndUpdate({ _id: payload.feedback_id }, { status: payload.status }, {
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
    updateAdminApprovedFeedback,
};
