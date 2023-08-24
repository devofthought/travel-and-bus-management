import express from 'express'
import { RouteValidation } from './route.validation'
import validateRequest from '../../middlewares/validateRequest'
import { RouteController } from './route.controller'
const router = express.Router()

router.post(
  '/',
  validateRequest(RouteValidation.createRouteZodSchema),
  RouteController.createRoute
)
export const RouteRoutes = router
