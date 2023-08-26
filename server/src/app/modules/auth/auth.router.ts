import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { authValidation } from './auth.validation'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post(
  '/signup',
  validateRequest(authValidation.createTravelerZodSchema),
  AuthController.createUser
)
router.post(
  '/admin/create-driver',
  validateRequest(authValidation.createDriverZodSchema),
  AuthController.createDriver
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
