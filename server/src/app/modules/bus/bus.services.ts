/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { VariantCreation } from '../../../utils/utilities'
import { busSearchableFields } from './bus.constants'
import { IBus, IBusFilter, IBusResponse } from './bus.interface'
import { Bus } from './bus.model'
import { generatedBusCode } from './bus.utils'

const createBus = async (payload: IBus): Promise<IBusResponse> => {
  // console.log(payload)
  const bus_code = await generatedBusCode() // generated bus code
  payload.bus_code = bus_code
  const newBus = await Bus.create(payload)
  if (!newBus) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create bus')
  }
  return newBus
}

const getAllBus = async (
  filters: IBusFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IBus[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: busSearchableFields?.map((field: any) => ({
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

  const result = await Bus.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Bus.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleBus = async (id: string): Promise<IBus | null> => {
  const bus_code = id.toLocaleUpperCase()
  const result = await Bus.findOne({ bus_code })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found!')
  }
  return result
}

const updateBus = async (
  id: string,
  payload: Partial<IBus>
): Promise<IBus | null> => {
  const bus_code = id.toLocaleUpperCase()
  delete payload.bus_code
  const isExist = await Bus.findOne({ bus_code })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Bus not found!')
  }

  const result = await Bus.findOneAndUpdate({ bus_code }, payload, {
    new: true,
  })
  return result
}

const deleteBus = async (id: string): Promise<IBus | null> => {
  const bus_code = id.toLocaleUpperCase()
  const result = await Bus.findOneAndDelete({ bus_code })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Bus not found!')
  }
  return result
}

const getAvailableBus = async (date: string): Promise<IBus[] | null> => {
  const allBuses = await Bus.find({});
  const result = VariantCreation.availabilityDivider(allBuses, date).standbyElements;
  return result;
}

export const BusService = {
  createBus,
  getAllBus,
  getSingleBus,
  updateBus,
  deleteBus,
  getAvailableBus,
}



/* function assignBuses(buses: Bus[], inputDate: string) {
  const assignedBuses: Bus[] = [];
  const standbyBuses: Bus[] = [];

  buses.forEach((bus) => {
    const isOccupied = bus.availability_status.some(
      (status) => status.date === inputDate
    );

    if (isOccupied) {
      assignedBuses.push(bus);
    } else {
      standbyBuses.push(bus);
    }
  });

  return { assignedBuses, standbyBuses };
}

// Input date to check bus availability
const inputDate = "2023-09-08";

// Assign buses based on the input date
const { assignedBuses, standbyBuses } = assignBuses(buses, inputDate);

console.log("Assigned Buses:");
assignedBuses.forEach((bus) => {
  console.log(`Bus ${bus.id}: ${bus.name}`);
});

console.log("\nStandby Buses:");
standbyBuses.forEach((bus) => {
  console.log(`Bus ${bus.id}: ${bus.name}`);
}); */
