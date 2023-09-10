
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


const availabilityDivider = (elements: any, inputDate: string) => {
    const assignedElements: any[] = [];
    const standbyElements: any[] = [];

    elements.forEach((element: any) => {
        const isOccupied = element.availability_status.some(
            (status: any) => status.date === inputDate
        );

        if (isOccupied) {
            assignedElements.push(element);
        } else {
            standbyElements.push(element);
        }
    });

    return { assignedElements, standbyElements };
}

const availabilityUpdater = async (
    code: string,
    entityName: "bus" | "driver",
    modelName: any, // Pass the Mongoose model as a parameter
    update: any
): Promise<any> => {
    // Determine the key (bus_code or driver_code) based on the entityName
    const key = entityName === "bus" ? "bus_code" : "driver_code";

    // Create the filter object to find the document
    const filter = { [key]: code };

    try {
        // Perform the findOneAndUpdate operation
        const result = await modelName.findOneAndUpdate(
            filter,
            { $push: { availability_status: update } },
            { new: true } // To return the updated document
        ).exec();

        if (!result) {
            // Handle the case where the document with the given code is not found
            throw new Error(`${entityName} with code ${code} not found`);
        }

        return result;
    } catch (error) {
        // Handle any errors, e.g., database errors or validation errors
        throw error;
    }
};


const findAvailabilityByDepartureTime = async (payload: any, departureTime: string, modelName: any) => {
    try {
        const pipeline = [
            {
                $match: payload
            },
            {
                $project: {
                    hasAvailabilityForDepartureTime: {
                        $in: [
                            departureTime,
                            "$availability_status.date" // Assuming your date field is named "date"
                        ]
                    }
                }
            }
        ];

        const result = await modelName.aggregate(pipeline);

        if (result.length > 0) {
            const { hasAvailabilityForDepartureTime } = result[0];
            return hasAvailabilityForDepartureTime;
        } else {
            throw new Error(`element with code is not found`);
        }
    } catch (error) {
        throw error;
    }
};


export const VariantCreation = {
    availabilityDivider,
    availabilityUpdater,
    findAvailabilityByDepartureTime,
};
