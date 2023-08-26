import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { IncidentController } from './incident.controller'
import { IncidentValidation } from './incident.validation'
const router = express.Router()

router.get('/:id', IncidentController.getSingleIncident)
router.get('/', IncidentController.getAllIncidents)
router.post(
  '/',
  validateRequest(IncidentValidation.createIncidentZodSchema),
  IncidentController.createAnIncident
)
router.patch(
  '/:id',
  validateRequest(IncidentValidation.updateIncidentZodSchema),
  IncidentController.updateAnIncident
)
router.delete('/:id', IncidentController.deleteAnIncident)

export const IncidentRoutes = router
