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
const user_model_1 = require("../user/user.model");
const createTrip = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const driver = yield utilities_1.VariantCreation.findAvailabilityByDepartureTime({ driver_code: payload.driver_code }, payload.departure_time, driver_model_1.Driver);
    console.log('17');
    const bus = yield utilities_1.VariantCreation.findAvailabilityByDepartureTime({ bus_code: payload.bus_code }, payload.departure_time, bus_model_1.Bus);
    console.log('19');
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
    // payload.bus_id = bus._id.toString()
    if (payload.trips_status !== 'pending') {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not able to create a past trip');
    }
    /* add available seat on the trip */
    //  const currentBus = Bus.findById(payload.bus_id)
    //  if (currentBus) {
    //   throw new ApiError(httpStatus.BAD_REQUEST, 'Bus is not available')
    // }
    payload.seats_available = 40;
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
        console.log('49');
        yield bus_model_1.Bus.findOneAndUpdate({ bus_code: newTripObject.bus_code }, {
            $push: {
                availability_status: {
                    status: 'transit',
                    date: newTripObject.departure_time,
                },
            },
        }, { session, new: true });
        console.log('55');
        yield driver_model_1.Driver.findOneAndUpdate({ _id: newTripObject.driver_id }, {
            $push: {
                availability_status: {
                    status: 'on-trip',
                    date: newTripObject.departure_time,
                },
            },
        }, { session, new: true });
        console.log('61');
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
            status: 'transit',
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
    const result2 = [];
    for (const trip of result) {
        const bus = yield bus_model_1.Bus.findOne({ bus_code: trip.bus_code }).select('_id model total_seats bus_code'); // find bus_id and bus_model
        const driver = yield driver_model_1.Driver.findById(trip.driver_id).select('_id driver_code'); // find driver name and driver_code
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
        // console.log(bookedSeatsArray)
        result2.push({
            bus_id: bus === null || bus === void 0 ? void 0 : bus._id,
            bus_model: bus === null || bus === void 0 ? void 0 : bus.model,
            bus_code: bus === null || bus === void 0 ? void 0 : bus.bus_code,
            driver_id: driver === null || driver === void 0 ? void 0 : driver._id,
            driver_code: driver === null || driver === void 0 ? void 0 : driver.driver_code,
            traveling_date: trip === null || trip === void 0 ? void 0 : trip.createdAt,
            departure_time: trip.departure_time,
            arrival_time: trip.arrival_time,
            from: route === null || route === void 0 ? void 0 : route.from,
            to: route === null || route === void 0 ? void 0 : route.to,
            distance: route === null || route === void 0 ? void 0 : route.distance,
            fare: trip.ticket_price,
            available_seat: (bus === null || bus === void 0 ? void 0 : bus.total_seats) &&
                (bus === null || bus === void 0 ? void 0 : bus.total_seats.length) - ((_b = (_a = bookedSeatsArray[0]) === null || _a === void 0 ? void 0 : _a.booked_seats) === null || _b === void 0 ? void 0 : _b.length),
            booked_seats_list: bookedSeatsArray,
            total_seat: bus === null || bus === void 0 ? void 0 : bus.total_seats,
            trips_status: trip.trips_status,
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Trip not found!');
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
// const getUpComingTrip = async (payload: IUpComingTripPayload) => {
//   const result = await Booking.find({ travel_id: payload.travel_id })
//   const uniqueBookings = Object.values(
//     result.reduce((acc, booking) => {
//       const key = booking.trip_id
//       if (!acc[key]) {
//         acc[key] = booking
//       }
//       return acc
//     }, {})
//   )
//   if (uniqueBookings.length === 0) {
//     return []
//   }
//   /*  */
//   const pendingTrip = []
//   for (const booksTrip of uniqueBookings as IBooksTrip[]) {
//     const trip = await Trip.findById(booksTrip.trip_id).populate({
//       path: 'route_id',
//       select: 'from to distance',
//     })
//     if (trip && trip.trips_status === 'pending') {
//       const seatCount = await Booking.find({
//         $and: [{ travel_id: payload.travel_id }, { trip_id: trip._id }],
//       })
//       pendingTrip.push({
//         from: trip.route_id.from,
//         to: trip.route_id.to,
//         distance: trip.route_id.distance,
//         departure_time: trip.departure_time,
//         arrival_time: trip.arrival_time,
//         bus_code: trip.bus_code,
//         fare: trip.ticket_price,
//         payment_status: booksTrip.status,
//         seat: seatCount.length,
//       })
//     }
//   }
//   return pendingTrip
// }
const getUpComingTrip = (payload, userAuth) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userAuth === null || userAuth === void 0 ? void 0 : userAuth.id);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user not found!');
    }
    const bookings = yield booking_model_1.Booking.find({ travel_id: user.traveler_id });
    if (bookings.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No booking found!');
    }
    const uniqueBookings = Array.from(new Set(bookings.map(booking => booking.trip_id))).map(tripId => bookings.find(booking => booking.trip_id === tripId));
    const pendingTrip = yield Promise.all(uniqueBookings.map((booksTrip) => __awaiter(void 0, void 0, void 0, function* () {
        if (booksTrip) {
            const trip = yield trip_model_1.Trip.findById(booksTrip.trip_id).populate({
                path: 'route_id',
                select: 'from to distance',
            });
            if (trip && trip.trips_status === payload.trip_status) {
                const seatCount = yield booking_model_1.Booking.countDocuments({
                    $and: [{ travel_id: user.traveler_id }, { trip_id: trip._id }],
                });
                return {
                    id: trip._id,
                    from: trip.route_id.from,
                    to: trip.route_id.to,
                    distance: trip.route_id.distance,
                    departure_time: trip.departure_time,
                    arrival_time: trip.arrival_time,
                    bus_code: trip.bus_code,
                    fare: trip.ticket_price,
                    trip_status: payload.trip_status,
                    payment_status: booksTrip.status,
                    seats: seatCount,
                    feedback: 'pending',
                };
            }
        }
        return null;
    })));
    return pendingTrip.filter(trip => trip !== null);
});
const getTripByUser = (info) => __awaiter(void 0, void 0, void 0, function* () {
    const { from, to, departure_time } = info;
    // Aggregate pipeline
    const getRoute = yield route_model_1.Route.findOne({
        $and: [
            { from: from.trim().toLocaleLowerCase() },
            { to: to.trim().toLocaleLowerCase() },
        ],
    });
    if (!getRoute) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'No trip found');
    }
    /*
    const dateObject = new Date(departure_time)
    dateObject.setUTCHours(23, 59, 59, 999) // Set the time to the end of the day
    const dayEnd = dateObject.toISOString()
  */
    // search depend time
    const datePart = departure_time.split('T')[0];
    const dayEnd = datePart + 'T23:59:59.999Z';
    const result = yield trip_model_1.Trip.find({
        $and: [
            { route_code: getRoute === null || getRoute === void 0 ? void 0 : getRoute.route_code },
            {
                departure_time: {
                    $gte: departure_time,
                    $lt: dayEnd,
                },
            },
        ],
    })
        .populate({
        path: 'route_id',
        select: 'from to distance',
    })
        .populate({
        path: 'driver_id',
        select: 'name driver_code',
    })
        .populate({
        path: 'bus_id',
        select: 'bus_code brand_name model',
    });
    return {
        meta: {},
        data: result,
    };
});
const getBusSeatStatusOnTrip = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { trip_id } = payload;
    const bookingList = yield booking_model_1.Booking.find({ trip_id }).select('booking_seat status');
    return bookingList;
});
exports.TripService = {
    createTrip,
    updateTrip,
    getAllTrip,
    getSingleTrip,
    getUpComingTrip,
    getAllUpdateAbleTrip,
    getTripByUser,
    getBusSeatStatusOnTrip,
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
