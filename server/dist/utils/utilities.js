"use strict";
/* const createAdmin = async (adminData: AdminModel) => {
    const newAdmin = new Admin(adminData);
    return newAdmin.save();
};

const createTraveler = async (travelerData: TravellerModel) => {
    const newTraveler = new Traveller(travelerData);
    return newTraveler.save();
};

const createDriver = async (driverData: DriverModel) => {
    const newDriver = new Driver(driverData);
    return newDriver.save();
}; */
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
exports.VariantCreation = exports.generateRandomPassword = void 0;
const availabilityDivider = (elements, inputDate) => {
    const assignedElements = [];
    const standbyElements = [];
    elements.forEach((element) => {
        const isOccupied = element.availability_status.some((status) => exports.VariantCreation.extractDateFromTimestamp(status.date) === inputDate);
        if (isOccupied) {
            assignedElements.push(element);
        }
        else {
            standbyElements.push(element);
        }
    });
    return { assignedElements, standbyElements };
};
const availabilityUpdater = (code, entityName, modelName, // Pass the Mongoose model as a parameter
update) => __awaiter(void 0, void 0, void 0, function* () {
    // Determine the key (bus_code or driver_code) based on the entityName
    const key = entityName === "bus" ? "bus_code" : "driver_code";
    // Create the filter object to find the document
    const filter = { [key]: code };
    try {
        // Perform the findOneAndUpdate operation
        const result = yield modelName.findOneAndUpdate(filter, { $push: { availability_status: update } }, { new: true } // To return the updated document
        ).exec();
        if (!result) {
            // Handle the case where the document with the given code is not found
            throw new Error(`${entityName} with code ${code} not found`);
        }
        return result;
    }
    catch (error) {
        // Handle any errors, e.g., database errors or validation errors
        throw error;
    }
});
const findAvailabilityByDepartureTime = (payload, departureTime, modelName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use the find method to search for documents that match the payload
        const documents = yield modelName.find(payload);
        // Check if any of the documents have availability for departureTime
        const hasAvailabilityForDepartureTime = documents.some((document) => document.availability_status.some((status) => status.date === departureTime));
        if (hasAvailabilityForDepartureTime) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        throw error;
    }
});
const extractDateFromTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const generateRandomPassword = (length = 6) => {
    const charset = "abcdelmnopst0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};
exports.generateRandomPassword = generateRandomPassword;
exports.VariantCreation = {
    availabilityDivider,
    availabilityUpdater,
    findAvailabilityByDepartureTime,
    extractDateFromTimestamp,
};
