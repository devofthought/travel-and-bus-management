import { DriverModel } from "../app/modules/driver/driver.interface";
import { AdminModel, TravellerModel } from "../app/modules/user/user.interface";
import { Admin, Driver, Traveller } from "../app/modules/user/user.model";

const createAdmin = async (adminData: AdminModel) => {
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
};

export const VariantCreation = {
    createAdmin,
    createTraveler,
    createDriver
};
