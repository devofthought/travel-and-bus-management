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
exports.TripService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const utilities_1 = require("../../../utils/utilities");
const booking_model_1 = require("../booking/booking.model");
const bus_model_1 = require("../bus/bus.model");
const driver_model_1 = require("../driver/driver.model");
const route_model_1 = require("../route/route.model");
const trip_constants_1 = require("./trip.constants");
const trip_model_1 = require("./trip.model");
const createTrip = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield utilities_1.VariantCreation.findAvailabilityByDepartureTime({ driver_code: payload.driver_code }, payload.departure_time, driver_model_1.Driver);
    console.log("17");
    const bus = yield utilities_1.VariantCreation.findAvailabilityByDepartureTime({ bus_code: payload.bus_code }, payload.departure_time, bus_model_1.Bus);
    console.log("19");
    const route = yield route_model_1.Route.findOne({ route_code: payload.route_code });
    if (!route) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Route is not found');
    }
    payload.route_id = route._id.toString();
    if (driver) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Driver is not available');
    }
    if (bus) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Bus is not available');
    }
    if (payload.trips_status !== 'pending') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not able to create a past trip');
    }
    payload.active_status = 'active';
    // generate student id
    let newTripObject = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //array
        const newTrip = yield trip_model_1.Trip.create([payload], { session });
        if (!newTrip.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create trip');
        }
        newTripObject = newTrip[0];
        console.log("49");
        yield bus_model_1.Bus.findOneAndUpdate({ bus_code: newTripObject.bus_code }, { $push: { availability_status: { status: 'transit', date: newTripObject.departure_time } } }, { session, new: true });
        console.log("55");
        yield driver_model_1.Driver.findOneAndUpdate({ _id: newTripObject.driver_id }, { $push: { availability_status: { status: 'on-trip', date: newTripObject.departure_time } } }, { session, new: true });
        console.log("61");
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    let finalTrip = null;
    if (newTripObject) {
        finalTrip = yield trip_model_1.Trip.findById(newTripObject._id)
            .populate('driver_id')
            .populate('bus_id')
            .populate('route_id');
    }
    return finalTrip;
});
const getAllUpdateAbleTrip = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: trip_constants_1.tripSearchableFields === null || trip_constants_1.tripSearchableFields === void 0 ? void 0 : trip_constants_1.tripSearchableFields.map((field) => ({
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
    const result = yield trip_model_1.Trip.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate('driver_id')
        .populate('bus_id')
        .populate('route_id');
    const total = yield trip_model_1.Trip.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
/*
 * change previous bus status
 * change pervious driver status
 * update trip
 * update bus status
 * update driver status
 */
const updateTrip = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const isExist = yield trip_model_1.Trip.findById(id);
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Trip not found!');
    }
    if (payload.driver_id) {
        const driver = yield utilities_1.VariantCreation.findAvailabilityByDepartureTime({ driver_code: payload.driver_code }, payload.departure_time, driver_model_1.Driver);
        if (driver) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Driver not found');
        }
        if (driver) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Driver is not available');
        }
    }
    if (payload.bus_code) {
        const bus = yield utilities_1.VariantCreation.findAvailabilityByDepartureTime({ bus_code: payload.bus_code }, payload.departure_time, bus_model_1.Bus);
        if (bus) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Bus is not available');
        }
    }
    let newTripObject = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (payload.bus_code) {
            yield bus_model_1.Bus.findOneAndUpdate({ bus_code: isExist.bus_code }, { availability_status: 'standBy' }, { session, new: true });
        }
        if (payload.driver_id) {
            yield driver_model_1.Driver.findOneAndUpdate({ _id: isExist.driver_id }, { driving_status: 'ready' }, { session, new: true });
        }
        //array
        const newTrip = yield trip_model_1.Trip.findByIdAndUpdate(id, payload, {
            session,
            new: true,
        });
        if (!newTrip) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to update trip');
        }
        newTripObject = newTrip;
        const update = {
            status: "transit",
            date: payload.departure_time,
        };
        if (payload.driver_id) {
            yield bus_model_1.Bus.findOneAndUpdate({ bus_code: newTripObject.bus_code }, { $push: { availability_status: update } }, 
            // { availability_status: 'transit' },
            { session, new: true });
        }
        if (payload.driver_id) {
            yield driver_model_1.Driver.findOneAndUpdate({ _id: newTripObject.driver_id }, { $push: { availability_status: update } }, 
            // { driving_status: 'on-trip' },
            { session, new: true });
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    let finalTrip = null;
    if (newTripObject) {
        finalTrip = yield trip_model_1.Trip.findById(newTripObject._id).populate('driver_id');
    }
    return finalTrip;
    /* if admin want to change driver id */
});
const getAllTrip = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: trip_constants_1.tripSearchableFields === null || trip_constants_1.tripSearchableFields === void 0 ? void 0 : trip_constants_1.tripSearchableFields.map((field) => ({
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
    const result = yield trip_model_1.Trip.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    let result2 = [];
    for (let trip of result) {
        const bus = yield bus_model_1.Bus.findOne({ bus_code: trip.bus_code }).select('_id model total_seats'); // find bus_id and bus_model
        const route = yield route_model_1.Route.findById(trip.route_id); // find to and from
        const bookedSeatsArray = yield booking_model_1.Booking.aggregate([
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
        ]); // create an array of booked_seats
        result2.push({
            bus_id: bus === null || bus === void 0 ? void 0 : bus._id,
            bus_model: bus === null || bus === void 0 ? void 0 : bus.model,
            driver_id: trip.driver_id,
            traveling_date: trip === null || trip === void 0 ? void 0 : trip.createdAt,
            departure_time: trip.departure_time,
            arrival_time: trip.arrival_time,
            from: route === null || route === void 0 ? void 0 : route.from,
            to: route === null || route === void 0 ? void 0 : route.to,
            fare: trip.ticket_price,
            available_seat: (bus === null || bus === void 0 ? void 0 : bus.total_seats) &&
                (bus === null || bus === void 0 ? void 0 : bus.total_seats.length) - ((_b = (_a = bookedSeatsArray[0]) === null || _a === void 0 ? void 0 : _a.booked_seats) === null || _b === void 0 ? void 0 : _b.length),
            total_seat: bus === null || bus === void 0 ? void 0 : bus.total_seats,
        });
    }
    const total = yield trip_model_1.Trip.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result2,
    };
});
const getSingleTrip = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_model_1.Trip.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'route not found!');
    }
    return result;
});
/**
 * dept.
 * from
 * to
 *
 * (must trips status pending)
 * */
const getUpComingTrip = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield trip_model_1.Trip.find({ trips_status: "pending" });
    return result;
});
const getTripByUser = (infor) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, departure_time } = infor;
    console.log(infor);
    // Aggregate pipeline
    const getRoute = yield route_model_1.Route.findOne({
        $and: [
            { from }, { to }
        ]
    });
    const result = yield trip_model_1.Trip.find({
        $and: [
            { route_code: getRoute === null || getRoute === void 0 ? void 0 : getRoute.route_code }, { departure_time }
        ]
    });
    console.log(result);
    return {
        meta: {},
        data: result,
    };
});
exports.TripService = {
    createTrip,
    updateTrip,
    getAllTrip,
    getSingleTrip,
    getUpComingTrip,
    getAllUpdateAbleTrip,
    getTripByUser,
};
/*
const { from, to, departure_time } = req.query;

// Aggregate pipeline
const pipeline = [
  {
    $match: {
      $and: [
        { from: from },
        { to: to },
      ],
    },
  },
  {
    $lookup: {
      from: 'trips', // Assuming your trips collection is named 'trips'
      localField: '_id',
      foreignField: 'route_id',
      as: 'trips',
    },
  },
  {
    $unwind: '$trips',
  },
  {
    $match: {
      'trips.departure_time': departure_time,
    },
  },
];

// Execute the aggregation pipeline
const result = await Route.aggregate(pipeline);

// The result will contain trips that match both route_id and departure_time

*/
