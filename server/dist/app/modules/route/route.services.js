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
exports.RouteService = void 0;
const paginationHelper_1 = require("../../../helper/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const route_model_1 = require("./route.model");
const route_constants_1 = require("./route.constants");
const route_utils_1 = require("./route.utils");
const createRoute = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const route_code = yield (0, route_utils_1.generatedRouteCode)(); // genarated bus code
    payload.route_code = route_code;
    payload.from = payload.from.toLowerCase();
    payload.to = payload.to.toLowerCase();
    const existingRoute = yield route_model_1.Route.findOne({
        from: payload.from,
        to: payload.to,
    });
    if (existingRoute) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'This route already has!');
    }
    const newRoute = yield route_model_1.Route.create(payload);
    return newRoute;
});
const getAllRoute = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: route_constants_1.routeSearchableFields === null || route_constants_1.routeSearchableFields === void 0 ? void 0 : route_constants_1.routeSearchableFields.map((field) => ({
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
    const result = yield route_model_1.Route.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield route_model_1.Route.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleRoute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield route_model_1.Route.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'route not found!');
    }
    return result;
});
const updateRoute = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    delete payload.route_code;
    const isExist = yield route_model_1.Route.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Route not found');
    }
    if (isExist.from === payload.from && isExist.to === payload.to) {
        const result = yield route_model_1.Route.findByIdAndUpdate(id, {
            $set: {
                distance: payload.distance,
            },
        }, {
            new: true,
        });
        return result;
    }
    if (payload.from && payload.to) {
        const existingRoute = yield route_model_1.Route.findOne({
            from: payload.from.trim().toLowerCase(),
            to: payload.to.trim().toLowerCase(),
        });
        if (existingRoute) {
            throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'This route already has!');
        }
        const result = yield route_model_1.Route.findByIdAndUpdate(id, {
            $set: {
                from: payload.from.trim().toLowerCase(),
                to: payload.to.trim().toLowerCase(),
            },
        }, {
            new: true,
        });
        return result;
    }
    const result = yield route_model_1.Route.findById(id);
    return result;
});
const deleteRoute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield route_model_1.Route.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'route not found!');
    }
    return result;
});
exports.RouteService = {
    createRoute,
    getAllRoute,
    getSingleRoute,
    updateRoute,
    deleteRoute,
};
