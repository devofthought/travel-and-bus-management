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
exports.BusService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const utilities_1 = require("../../../utils/utilities");
const booking_model_1 = require("../booking/booking.model");
const trip_model_1 = require("../trip/trip.model");
const bus_constants_1 = require("./bus.constants");
const bus_model_1 = require("./bus.model");
const bus_utils_1 = require("./bus.utils");
const cloudinary_1 = __importDefault(require("../../../config/cloudinary"));
const createBus = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const bus_code = yield (0, bus_utils_1.generatedBusCode)(); // generated bus code
    payload.bus_code = bus_code;
    const newBus = yield bus_model_1.Bus.create(payload);
    if (!newBus) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create bus');
    }
    return newBus;
});
const getAllBus = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: bus_constants_1.busSearchableFields === null || bus_constants_1.busSearchableFields === void 0 ? void 0 : bus_constants_1.busSearchableFields.map((field) => ({
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
    const result = yield bus_model_1.Bus.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield bus_model_1.Bus.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bus_code = id.toLocaleUpperCase();
    const result = yield bus_model_1.Bus.findOne({ bus_code });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Bus not found!');
    }
    return result;
});
const updateBus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield bus_model_1.Bus.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Bus not found!');
    }
    const { model, brand_name, total_seats } = payload;
    const updatePayload = {};
    if (model !== undefined)
        updatePayload.model = model;
    if (brand_name !== undefined)
        updatePayload.brand_name = brand_name;
    if (total_seats !== undefined)
        updatePayload.total_seats = total_seats;
    const result = yield bus_model_1.Bus.findByIdAndUpdate(id, { $set: updatePayload }, {
        new: true,
    });
    return result;
});
const deleteBus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const bus_code = id.toLocaleUpperCase();
    const result = yield bus_model_1.Bus.findOneAndDelete({ bus_code });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Bus not found!');
    }
    return result;
});
const getAvailableBus = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const allBuses = yield bus_model_1.Bus.find({});
    const departureDate = utilities_1.VariantCreation.extractDateFromTimestamp(date);
    const result = utilities_1.VariantCreation.availabilityDivider(allBuses, departureDate).standbyElements;
    return result;
});
const seatViewForBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const tripId = id; // Replace 'your_trip_id' with the actual trip_id you want to filter by
    const findTrip = yield trip_model_1.Trip.findById(tripId);
    const bookedSeatsArray = yield booking_model_1.Booking.aggregate([
        {
            $match: {
                trip_id: tripId, // Match collections with the specified trip_id
            },
        },
        {
            $group: {
                _id: null,
                booked_seats: { $push: '$booked_seat' },
            },
        },
        {
            $project: {
                _id: 0,
                booked_seats: 1,
            },
        },
    ]);
    // Assuming you have obtained 'bookedSeatsArray' and 'tripId' as described in the previous response
    const busInfo = yield bus_model_1.Bus.findOne({ trip_id: findTrip === null || findTrip === void 0 ? void 0 : findTrip.bus_code }); // Assuming there's a 'trip_id' field in the Bus model
    let availableSeats = [];
    const bookedSeats = bookedSeatsArray.length > 0 ? bookedSeatsArray[0].booked_seats : [];
    if (busInfo) {
        const totalSeats = busInfo.total_seats;
        // Create an array of available seats by filtering out the booked seats
        availableSeats = totalSeats.filter(seat => !bookedSeats.includes(seat));
        console.log('Available seats:', availableSeats);
    }
    else {
        console.log('Bus information not found for the specified trip_id.');
    }
    return { availableSeats, bookedSeats };
});
const updateBusImage = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isExist = yield bus_model_1.Bus.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Bus not found!');
    }
    const { image, image_name } = payload;
    if (image === undefined ||
        !['bus_image', 'outer_image', 'inner_image'].includes(image_name)) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'some thing wrong! try later');
    }
    const isValidImageName = ['bus_image', 'outer_image', 'inner_image'].includes(image_name);
    if (payload.image &&
        isExist &&
        isValidImageName &&
        ((_a = isExist[image_name]) === null || _a === void 0 ? void 0 : _a.avatar_public_url)) {
        yield cloudinary_1.default.uploader.destroy((_b = isExist[image_name]) === null || _b === void 0 ? void 0 : _b.avatar_public_url);
    }
    const result = yield bus_model_1.Bus.findByIdAndUpdate(id, { $set: { [image_name]: image } }, {
        new: true,
    });
    return result;
});
exports.BusService = {
    createBus,
    getAllBus,
    getSingleBus,
    updateBus,
    deleteBus,
    getAvailableBus,
    seatViewForBooking,
    updateBusImage,
};
