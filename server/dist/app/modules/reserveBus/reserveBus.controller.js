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
exports.ReserveBusController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = require("../../../shared/pick");
const pagination_1 = require("../../../constants/pagination");
const reserveBus_services_1 = require("./reserveBus.services");
const reserveBus_constants_1 = require("./reserveBus.constants");
const reserveBusRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reserveBus_services_1.ReserveBusService.reserveBusRequest(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Your reserved bus request has been successfully sent!',
        data: result,
    });
}));
const getAllReserveBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.pick)(req.query, reserveBus_constants_1.reserveBusFilterableFields);
    const paginationOptions = (0, pick_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield reserveBus_services_1.ReserveBusService.getAllReserveBus(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All ReserveBus retrieved successfully !',
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleUserReserveBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reserveBus_services_1.ReserveBusService.getSingleUserReserveBus(req.params.user_id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ReserveBuss retrieved successfully!',
        data: result,
    });
}));
const updateReserveBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield reserveBus_services_1.ReserveBusService.updateReserveBus(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ReserveBus updated successfully!',
        data: result,
    });
}));
const deleteReserveBus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield reserveBus_services_1.ReserveBusService.deleteReserveBus(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ReserveBus deleted successfully!',
        data: result,
    });
}));
exports.ReserveBusController = {
    reserveBusRequest,
    getAllReserveBus,
    getSingleUserReserveBus,
    updateReserveBus,
    deleteReserveBus,
};
