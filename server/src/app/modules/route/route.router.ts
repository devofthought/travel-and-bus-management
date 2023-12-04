import express from 'express'
import { RouteValidation } from './route.validation'
import validateRequest from '../../middlewares/validateRequest'
import { RouteController } from './route.controller'
import { ENUM_USER_ROLE } from '../../../enums/user'
import auth from '../../middlewares/auth'
const router = express.Router()

router.get('/', auth(ENUM_USER_ROLE.ADMIN), RouteController.getAllRoute)
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(RouteValidation.createRouteZodSchema),
  RouteController.createRoute
)
router.patch(
  '/:_id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(RouteValidation.updateRouteZodSchema),
  RouteController.updateRoute
)
router.get('/:_id', RouteController.getSingleRoute)
router.delete('/:_id', RouteController.deleteRoute)

export const RouteRoutes = router
