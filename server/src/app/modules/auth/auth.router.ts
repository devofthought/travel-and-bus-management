import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authValidation } from './auth.validation'
import { AuthController } from './auth.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(authValidation.createTravelerZodSchema),
  AuthController.createUser
)
router.post(
  '/admin/create-driver',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(authValidation.createDriverZodSchema),
  AuthController.createDriver
)

router.post(
  '/admin/create-admin',
  validateRequest(authValidation.createAdminZodSchema),
  AuthController.createAdmin
)

router.post(
  '/login',
  validateRequest(authValidation.loginUserZodSchema),
  AuthController.login
)

router.post(
  '/refresh-token',
  validateRequest(authValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

router.post('/google_auth', AuthController.googleAuth)

export const AuthRouter = router
