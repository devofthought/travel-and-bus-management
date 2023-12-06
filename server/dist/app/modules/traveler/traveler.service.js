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
exports.TravelerService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const traveler_modal_1 = require("./traveler.modal");
const traveler_constants_1 = require("./traveler.constants");
const user_model_1 = require("../user/user.model");
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const getAllTraveler = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: traveler_constants_1.travelerSearchableFields === null || traveler_constants_1.travelerSearchableFields === void 0 ? void 0 : traveler_constants_1.travelerSearchableFields.map((field) => ({
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
    const result = yield traveler_modal_1.Traveler.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield traveler_modal_1.Traveler.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleTraveler = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield traveler_modal_1.Traveler.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Traveler not found!');
    }
    return result;
});
const updateTraveler = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    delete payload._id;
    delete payload.email;
    const isExistUser = yield user_model_1.User.findById(user === null || user === void 0 ? void 0 : user.id);
    if (!isExistUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Traveler is not found!');
    }
    const traveler = yield traveler_modal_1.Traveler.findById(isExistUser.traveler_id);
    // console.log(traveler)
    if (payload.image && traveler && traveler.image && traveler.image.avatar_public_url) {
        yield cloudinary_1.default.uploader.destroy(traveler.image.avatar_public_url);
        // console.log(result);
        // console.log('image here', traveler.image.avatar_public_url)
    }
    const result = yield traveler_modal_1.Traveler.findByIdAndUpdate(isExistUser.traveler_id, payload, { new: true });
    return result;
});
exports.TravelerService = {
    getAllTraveler,
    getSingleTraveler,
    updateTraveler,
};
