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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatedDriverCode = exports.findDriverCode = void 0;
const driver_model_1 = require("./driver.model");
const findDriverCode = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lastRoute = yield driver_model_1.Driver.findOne({}, { driver_code: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean(); // operation make faster
    return (lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.driver_code)
        ? (_a = lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.driver_code) === null || _a === void 0 ? void 0 : _a.substring(2)
        : undefined;
});
exports.findDriverCode = findDriverCode;
const generatedDriverCode = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findDriverCode)()) || (0).toString().padStart(4, '0'); // 00000
    // increment by one
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(4, '0');
    incrementedId = `D-${incrementedId}`; //D-0001
    return incrementedId;
});
exports.generatedDriverCode = generatedDriverCode;
