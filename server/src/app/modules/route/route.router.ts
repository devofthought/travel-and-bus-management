import express from 'express'
import { RouteValidation } from './route.validation'
import validateRequest from '../../middlewares/validateRequest'
import { RouteController } from './route.controller'
const router = express.Router()

router.get('/', RouteController.getAllRoute)
router.post(
  '/',
  validateRequest(RouteValidation.createRouteZodSchema),
  RouteController.createRoute
)
router.patch(
  '/:_id',
  validateRequest(RouteValidation.updateRouteZodSchema),
  RouteController.updateRoute
)
router.get('/:_id', RouteController.getSingleRoute)
router.delete('/:_id', RouteController.deleteRoute)

export const RouteRoutes = router
