
const createAdmin = async (adminData) => {
    const newAdmin = new Admin(adminData);
    return newAdmin.save();
};

const createTraveler = async (travelerData) => {
    const newTraveler = new Traveler(travelerData);
    return newTraveler.save();
};

const createDriver = async (driverData) => {
    const newDriver = new Driver(driverData);
    return newDriver.save();
};

export const VariantCreation = {
    createAdmin,
    createTraveler,
    createDriver
};
