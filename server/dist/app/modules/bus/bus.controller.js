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
exports.BusController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = require("../../../shared/pick");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const bus_constants_1 = require("./bus.constants");
const bus_services_1 = require("./bus.services");
const createBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bus = Object.assign({}, req.body);
    if (Array.isArray(req.files)) {
        const uploadPromises = req.files.map((element) => __awaiter(void 0, void 0, void 0, function* () {
            if (element) {
                const image = yield cloudinary_1.default.uploader.upload(element.path); // Use element.path to get the file path
                return image;
            }
            return null;
        }));
        // Wait for all the uploads to complete before continuing
        const uploadedImages = yield Promise.all(uploadPromises);
        // Process the uploaded images as needed
        uploadedImages.forEach((image, index) => {
            if (image && index === 0) {
                const avatar = {
                    avatar: image.secure_url,
                    avatar_public_url: image.public_id,
                };
                bus.bus_image = avatar;
            }
            else if (image && index === 1) {
                const avatar = {
                    avatar: image.secure_url,
                    avatar_public_url: image.public_id,
                };
                bus.inner_image = avatar;
            }
            else if (image && index === 2) {
                const avatar = {
                    avatar: image.secure_url,
                    avatar_public_url: image.public_id,
                };
                bus.outer_image = avatar;
            }
        });
    }
    const result = yield bus_services_1.BusService.createBus(bus);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bus created successfully!',
        data: result,
    });
}));
const getAllBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, bus_constants_1.busFilterableFields);
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield bus_services_1.BusService.getAllBus(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All bus retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bus_code = req.params.bus_code;
    const result = yield bus_services_1.BusService.getSingleBus(bus_code);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bus data retrieved successfully!',
        data: result,
    });
}));
const updateBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield bus_services_1.BusService.updateBus(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bus updated successfully!',
        data: result,
    });
}));
const deleteBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bus_code = req.params.bus_code;
    const result = yield bus_services_1.BusService.deleteBus(bus_code);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bus deleted successfully!',
        data: result,
    });
}));
const getAvailableBusController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_services_1.BusService.getAvailableBus(req.body.departure_time);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Available buses fetched successfully',
        data: result,
    });
}));
const seatViewForBookingController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bus_services_1.BusService.seatViewForBooking(req.body.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'booking info of buses fetched successfully',
        data: result,
    });
}));
const updateBusImage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = req.params.id;
    const updatedData = req.body;
    if (req.file) {
        const uploadedImage = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const avatar = {
            avatar: uploadedImage.secure_url,
            avatar_public_url: uploadedImage.public_id,
        };
        updatedData.image = avatar;
    }
    const result = yield bus_services_1.BusService.updateBusImage(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Bus updated successfully!',
        data: result,
    });
}));
exports.BusController = {
    createBus,
    getAllBus,
    getSingleBus,
    updateBus,
    deleteBus,
    getAvailableBusController,
    seatViewForBookingController,
    updateBusImage,
};
