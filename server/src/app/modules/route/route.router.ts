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
  '/:route_code',
  validateRequest(RouteValidation.updateRouteZodSchema),
  RouteController.updateRoute
)
router.get('/:route_code', RouteController.getSingleRoute)
export const RouteRoutes = router
