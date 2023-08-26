import httpStatus from 'http-status'
import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import { paginationFields } from '../../../constants/pagination'
import { incidentFilterableFields } from './incident.constants'
import { IncidentService } from './incident.services'
import { IIncident } from './incident.interface'

const createAnIncident: RequestHandler = catchAsync(async (req, res) => {
  const result = await IncidentService.createAnIncident(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Incident created successfully!',
    data: result,
  })
})

const getAllIncidents: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, incidentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await IncidentService.getAllIncidents(
    filters,
    paginationOptions
  )

  sendResponse<IIncident[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Incidents retrieved successfully !',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleIncident: RequestHandler = catchAsync(async (req, res) => {
  const result = await IncidentService.getSingleIncident(req.params.id)

  sendResponse<IIncident>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Incident retrieved successfully !',
    data: result,
  })
})

const updateAnIncident: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await IncidentService.updateAnIncident(id, updatedData)

  sendResponse<IIncident>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Incident updated successfully!',
    data: result,
  })
})

const deleteAnIncident: RequestHandler = catchAsync(async (req, res) => {
  const result = await IncidentService.deleteAnIncident(req.params.id)

  sendResponse<IIncident>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Incident deleted successfully!',
    data: result,
  })
})

export const IncidentController = {
  createAnIncident,
  getAllIncidents,
  updateAnIncident,
  deleteAnIncident,
  getSingleIncident,
}
