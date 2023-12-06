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
exports.AuthService = void 0;
/* eslint-disable no-constant-condition */
const google_auth_library_1 = require("google-auth-library");
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const admin_modal_1 = require("../admin/admin.modal");
const driver_model_1 = require("../driver/driver.model");
const traveler_modal_1 = require("../traveler/traveler.modal");
const user_model_1 = require("../user/user.model");
const driver_utils_1 = require("../driver/driver.utils");
// oauthj cilent code
const cilent = new google_auth_library_1.OAuth2Client('902731341146-i96tb5ehl1hlog621ba6qamdfss3qob1.apps.googleusercontent.com');
const createTraveler = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let newUserAllData = null;
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(payload.email);
    if (isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'email already exists');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //array
        const newTraveler = yield traveler_modal_1.Traveler.create([payload], { session });
        if (!newTraveler.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create a traveler');
        }
        const user = Object.assign(Object.assign({}, payload), { traveler_id: newTraveler[0]._id, role: 'traveler' });
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ _id: newUserAllData._id })
            .populate('driver_id')
            .populate('traveler_id')
            .populate('admin_id');
    }
    let accessToken;
    let refreshToken;
    if (newUserAllData) {
        accessToken = jwtHelpers_1.jwtHelpers.createToken({
            id: newUserAllData._id,
            role: newUserAllData.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        refreshToken = jwtHelpers_1.jwtHelpers.createToken({
            id: newUserAllData._id,
            role: newUserAllData.role,
        }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    }
    return { result: newUserAllData, refreshToken, accessToken };
});
const createDriver = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const driverData = Object.assign({}, payload);
    const driver_code = yield (0, driver_utils_1.generatedDriverCode)(); // generated driver code
    let newDriverData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const isEmailHas = yield user_model_1.User.findOne({ email: payload.email });
        if (isEmailHas) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'email is not a valid email');
        }
        const isPhoneHas = yield driver_model_1.Driver.findOne({ phone: payload.phone });
        if (isPhoneHas) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'phone is not a valid phone');
        }
        //array
        driverData.joining_date = new Date().toISOString();
        driverData.driver_code = driver_code;
        const newDriver = yield driver_model_1.Driver.create([driverData], { session });
        if (!newDriver.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create a driver');
        }
        const user = {
            name: payload.name,
            email: payload.email,
            driver_id: newDriver[0]._id,
            role: 'driver',
            password: config_1.default.default_driver_password,
        };
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        // TODO: send a welcome email to driver email.
        newDriverData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newDriverData) {
        newDriverData = yield user_model_1.User.findOne({ _id: newDriverData.id })
            .populate('driver_id')
            .populate('traveler_id')
            .populate('admin_id');
    }
    return { result: newDriverData };
});
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const adminData = Object.assign({}, payload);
    let newAdminAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //array
        const newAdmin = yield admin_modal_1.Admin.create([adminData], { session });
        if (!newAdmin.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create a admin');
        }
        const user = {
            name: payload.name,
            email: payload.email,
            admin_id: newAdmin[0]._id,
            role: 'admin',
            password: config_1.default.default_admin_password,
        };
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create user');
        }
        newAdminAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newAdminAllData) {
        newAdminAllData = yield user_model_1.User.findOne({ _id: newAdminAllData.id })
            .populate('driver_id')
            .populate('traveler_id')
            .populate('admin_id');
    }
    return { result: newAdminAllData };
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(payload.email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (isUserExist.password &&
        !(yield user.isPasswordMatch(payload.password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Invalid password');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    const userData = yield user_model_1.User.findOne({ _id: isUserExist._id });
    return {
        userData,
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
    const { id, role } = verifiedToken;
    // check if user exists of not
    const isUserExist = yield user_model_1.User.findOne({ _id: id });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: id,
        role: role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken,
    };
});
const googleAuth = (tokenId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield cilent.verifyIdToken({
            idToken: tokenId,
            audience: '733785501526-kf7fkkbo5i29t9kjq2npllh2fd14fvhj.apps.googleusercontent.com',
        });
        const payload = response.getPayload();
        if (!payload) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Payload not found!');
        }
        const { name, email, email_verified, family_name } = payload;
        if (!email_verified) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cannot login! Try a different way.');
        }
        let userExists = yield user_model_1.User.findOne({ email: email });
        if (!userExists) {
            userExists = yield user_model_1.User.create({
                name: name,
                email: email,
                password: family_name + '@1234',
                role: 'user',
                phone: email,
            });
        }
        const accessToken = jwtHelpers_1.jwtHelpers.createToken({
            id: userExists._id,
            role: userExists.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        const refreshToken = jwtHelpers_1.jwtHelpers.createToken({
            id: userExists._id,
            role: userExists.role,
        }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
        return {
            userData: userExists,
            accessToken,
            refreshToken,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Something went wrong.');
    }
});
exports.AuthService = {
    createTraveler,
    createDriver,
    createAdmin,
    login,
    refreshToken,
    googleAuth,
};
