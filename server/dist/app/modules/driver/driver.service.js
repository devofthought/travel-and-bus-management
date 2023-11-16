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
exports.DriverService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const utilities_1 = require("../../../utils/utilities");
const driver_constants_1 = require("./driver.constants");
const driver_model_1 = require("./driver.model");
const getAllDrivers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: driver_constants_1.driverSearchableFields === null || driver_constants_1.driverSearchableFields === void 0 ? void 0 : driver_constants_1.driverSearchableFields.map(field => ({
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
    const result = yield driver_model_1.Driver.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield driver_model_1.Driver.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleDriver = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield driver_model_1.Driver.findById(id);
    return result;
});
const updateDriver = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield driver_model_1.Driver.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Driver not found');
    }
    const result = yield driver_model_1.Driver.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Driver not updated');
    }
    return result;
});
const getAvailableDriver = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const allDriver = yield driver_model_1.Driver.find({});
    const departureDate = utilities_1.VariantCreation.extractDateFromTimestamp(date);
    const result = utilities_1.VariantCreation.availabilityDivider(allDriver, departureDate).standbyElements;
    return result;
});
exports.DriverService = {
    getAllDrivers,
    getSingleDriver,
    updateDriver,
    getAvailableDriver,
};
/*
// Function to assign drivers based on input date
function assignDrivers(drivers: Driver[], inputDate: string) {
  const assignedDrivers: Driver[] = [];
  const standbyDrivers: Driver[] = [];

  drivers.forEach((driver) => {
    const isOccupied = driver.availability_status.some(
      (status) => status.date === inputDate
    );

    if (isOccupied) {
      assignedDrivers.push(driver);
    } else {
      standbyDrivers.push(driver);
    }
  });

  return { assignedDrivers, standbyDrivers };
}

// Input date to check driver availability
const inputDate = "2023-09-08";

// Assign drivers based on the input date
const { assignedDrivers, standbyDrivers } = assignDrivers(drivers, inputDate);

console.log("Assigned Drivers:");
assignedDrivers.forEach((driver) => {
  console.log(`Driver ${driver.id}: ${driver.name}`);
});

console.log("\nStandby Drivers:");
standbyDrivers.forEach((driver) => {
  console.log(`Driver ${driver.id}: ${driver.name}`);
});
*/
