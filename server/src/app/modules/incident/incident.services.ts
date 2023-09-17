/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import {
  IIncident,
  IIncidentFilter,
  IIncidentResponse,
} from './incident.interface'
import { Incident } from './incident.model'
import { incidentSearchableFields } from './incident.constants'
import { Bus } from '../bus/bus.model'

const createAnIncident = async (
  payload: IIncident
): Promise<IIncidentResponse | null> => {
  const incidentData = { ...payload }
  let newIncidentData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const getBusInfo = await Bus.findOne({ bus_code: payload.bus_code })
    if (!getBusInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to this bus')
    }

    incidentData.bus_id = getBusInfo._id.toString()
    const newIncident = await Incident.create([incidentData], { session }) // return a array
    if (!newIncident.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create a driver')
    }
    newIncidentData = newIncident[0]

    if (newIncident[0].servicing_status === 'on-servicing') {
      await Bus.findOneAndUpdate(
        { bus_code: payload.bus_code },
        { availability_status: 'servicing' },
        { session, new: true }
      )
    } else if (newIncident[0].servicing_status === 'pending') {
      await Bus.findOneAndUpdate(
        { bus_code: payload.bus_code },
        { availability_status: 'rest' },
        { session, new: true }
      )
    }

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  const newIncident = await Incident.findById(newIncidentData._id).populate(
    'bus_id'
  )
  if (!newIncident) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Incident')
  }
  return newIncident
}

const getAllIncidents = async (
  filters: IIncidentFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IIncident[]>> => {
  const { searchTerm, ...filtersData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: incidentSearchableFields?.map((field: any) => ({
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

  const result = await Incident.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Incident.countDocuments(whereCondition)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleIncident = async (_id: string): Promise<IIncident | null> => {
  const result = await Incident.findOne({ _id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incident not found!')
  }
  return result
}

const updateAnIncident = async (
  id: string,
  payload: Partial<IIncident>
): Promise<IIncident | null> => {
  const isExist = await Incident.findOne({ _id: id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incident not found!')
  }

  const result = await Incident.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteAnIncident = async (id: string): Promise<IIncident | null> => {
  const result = await Incident.findOneAndDelete({ _id: id })
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Incident not found!')
  }
  return result
}

export const IncidentService = {
  createAnIncident,
  getAllIncidents,
  updateAnIncident,
  deleteAnIncident,
  getSingleIncident,
}
