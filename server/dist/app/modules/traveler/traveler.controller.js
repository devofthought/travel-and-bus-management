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
exports.TravelerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constants/pagination");
const traveler_constants_1 = require("./traveler.constants");
const traveler_service_1 = require("./traveler.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const getAllTraveler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, traveler_constants_1.travelerFilterableFields);
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield traveler_service_1.TravelerService.getAllTraveler(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All Traveler retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleTraveler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield traveler_service_1.TravelerService.getSingleTraveler(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Traveler data retrieved successfully!',
        data: result,
    });
}));
const updateTraveler = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = req.user;
    const updatedData = req.body;
    if (req.file) {
        const uploadedImage = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const avatar = {
            avatar: uploadedImage.secure_url,
            avatar_public_url: uploadedImage.public_id,
        };
        updatedData.image = avatar;
    }
    const result = yield traveler_service_1.TravelerService.updateTraveler(user, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Traveler information updated successfully!',
        data: result,
    });
}));
exports.TravelerController = {
    getAllTraveler,
    getSingleTraveler,
    updateTraveler,
};
