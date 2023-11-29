
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
            (status: any) => VariantCreation.extractDateFromTimestamp(status.date) === inputDate
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


const findAvailabilityByDepartureTime = async (payload: any, departureTime: any, modelName: any) => {
    try {
        // Use the find method to search for documents that match the payload
        const documents = await modelName.find(payload);

        // Check if any of the documents have availability for departureTime
        const hasAvailabilityForDepartureTime = documents.some((document: any) =>
            document.availability_status.some((status: any) => status.date === departureTime)
        );

        if (hasAvailabilityForDepartureTime) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw error;
    }
};

const extractDateFromTimestamp = (timestamp: any) => {
    const dateObject = new Date(timestamp);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};



export const generateRandomPassword = (length = 6)=> {
    const charset = "abcdelmnopst0123456789";
    let password = "";
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    
    return password;
  }


export const VariantCreation = {
    availabilityDivider,
    availabilityUpdater,
    findAvailabilityByDepartureTime,
    extractDateFromTimestamp,
};
