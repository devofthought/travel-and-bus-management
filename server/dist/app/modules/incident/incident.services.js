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
exports.IncidentService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const incident_model_1 = require("./incident.model");
const incident_constants_1 = require("./incident.constants");
const bus_model_1 = require("../bus/bus.model");
const createAnIncident = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const incidentData = Object.assign({}, payload);
    let newIncidentData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const getBusInfo = yield bus_model_1.Bus.findOne({ bus_code: payload.bus_code });
        if (!getBusInfo) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to this bus');
        }
        incidentData.bus_id = getBusInfo._id.toString();
        const newIncident = yield incident_model_1.Incident.create([incidentData], { session }); // return a array
        if (!newIncident.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create a driver');
        }
        newIncidentData = newIncident[0];
        if (newIncident[0].servicing_status === 'on-servicing') {
            yield bus_model_1.Bus.findOneAndUpdate({ bus_code: payload.bus_code }, { availability_status: 'servicing' }, { session, new: true });
        }
        else if (newIncident[0].servicing_status === 'pending') {
            yield bus_model_1.Bus.findOneAndUpdate({ bus_code: payload.bus_code }, { availability_status: 'rest' }, { session, new: true });
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    const newIncident = yield incident_model_1.Incident.findById(newIncidentData._id).populate('bus_id');
    if (!newIncident) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create Incident');
    }
    return newIncident;
});
const getAllIncidents = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: incident_constants_1.incidentSearchableFields === null || incident_constants_1.incidentSearchableFields === void 0 ? void 0 : incident_constants_1.incidentSearchableFields.map((field) => ({
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
    const result = yield incident_model_1.Incident.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield incident_model_1.Incident.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleIncident = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield incident_model_1.Incident.findOne({ _id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Incident not found!');
    }
    return result;
});
const updateAnIncident = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield incident_model_1.Incident.findOne({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Incident not found!');
    }
    const result = yield incident_model_1.Incident.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteAnIncident = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield incident_model_1.Incident.findOneAndDelete({ _id: id });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Incident not found!');
    }
    return result;
});
exports.IncidentService = {
    createAnIncident,
    getAllIncidents,
    updateAnIncident,
    deleteAnIncident,
    getSingleIncident,
};
