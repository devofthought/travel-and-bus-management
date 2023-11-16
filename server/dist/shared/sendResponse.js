"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const responseData = {
        statusCode: data === null || data === void 0 ? void 0 : data.statusCode,
        success: data === null || data === void 0 ? void 0 : data.success,
        message: data === null || data === void 0 ? void 0 : data.message,
        meta: (data === null || data === void 0 ? void 0 : data.meta) || null || undefined,
        data: (data === null || data === void 0 ? void 0 : data.data) || null || undefined,
    };
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json(responseData);
};
exports.default = sendResponse;
