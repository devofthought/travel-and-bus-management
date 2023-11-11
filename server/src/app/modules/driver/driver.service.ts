/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { VariantCreation } from '../../../utils/utilities'
import { driverSearchableFields } from './driver.constants'
import { IDriver, IDriverFilter } from './driver.interface'
import { Driver } from './driver.model'

const getAllDrivers = async (
  filters: IDriverFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IDriver[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: driverSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder }

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {}

  const result = await Driver.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Driver.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleDriver = async (id: string): Promise<IDriver | null> => {
  const result = await Driver.findById(id)
  return result
}

const updateDriver = async (
  id: string,
  payload: Partial<IDriver>
): Promise<IDriver | null> => {
  const isExist = await Driver.findById(id)

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not found')
  }

  const result = await Driver.findByIdAndUpdate(id, payload, {
    new: true,
  })

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Driver not updated')
  }
  return result
}

const getAvailableDriver = async (date: string): Promise<IDriver[] | null> => {
  const allDriver = await Driver.find({});
  const departureDate = VariantCreation.extractDateFromTimestamp(date);
  const result = VariantCreation.availabilityDivider(allDriver, departureDate).standbyElements;
  return result;
}

export const DriverService = {
  getAllDrivers,
  getSingleDriver,
  updateDriver,
  getAvailableDriver,
}


/* 
// Function to assign drivers based on input date
function assignDrivers(drivers: Driver[], inputDate: string) {
  const assignedDrivers: Driver[] = [];
  const standbyDrivers: Driver[] = [];

  drivers.forEach((driver) => {
    const isOccupied = driver.availability_status.some(
      (status) => status.date === inputDate
    );

    if (isOccupied) {
      assignedDrivers.push(driver);
    } else {
      standbyDrivers.push(driver);
    }
  });

  return { assignedDrivers, standbyDrivers };
}

// Input date to check driver availability
const inputDate = "2023-09-08";

// Assign drivers based on the input date
const { assignedDrivers, standbyDrivers } = assignDrivers(drivers, inputDate);

console.log("Assigned Drivers:");
assignedDrivers.forEach((driver) => {
  console.log(`Driver ${driver.id}: ${driver.name}`);
});

console.log("\nStandby Drivers:");
standbyDrivers.forEach((driver) => {
  console.log(`Driver ${driver.id}: ${driver.name}`);
});
*/
