import express from 'express'
import { SupportValidation } from './support.validation'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { SupportController } from './support.controller'
const router = express.Router()

router.get('/', auth(ENUM_USER_ROLE.ADMIN), SupportController.getAllSupport)
router.post(
  '/',
  validateRequest(SupportValidation.createSupportZodSchema),
  SupportController.createSupport
)

export const SupportRoutes = router
