/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IIncident, IIncidentFilter } from './incident.interface'
import { Incident } from './incident.model'
import { incidentSearchableFields } from './incident.constants'

const createAnIncident = async (
  payload: IIncident
): Promise<IIncident | null> => {
  const newIncident = await Incident.create(payload)
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
