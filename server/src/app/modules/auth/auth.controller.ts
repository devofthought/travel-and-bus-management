import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import {
  IRefreshTokenResponse,
  IUserLoginResponse,
  IUserSignupResponse,
} from './auth.interface'
import config from '../../../config'

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...userData } = req.body

  const { result, refreshToken, accessToken } =
    await AuthService.createTraveler(userData)

  // set refresh token in the browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IUserSignupResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Traveler created successfully',
    data: { result, accessToken },
  })
})

const createDriver: RequestHandler = catchAsync(async (req, res) => {
  const { ...userData } = req.body

  const { result } = await AuthService.createDriver(userData)

  sendResponse<IUserSignupResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Driver created successfully',
    data: { result },
  })
})

const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { ...userData } = req.body

  const { result } = await AuthService.createAdmin(userData)

  sendResponse<IUserSignupResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: { result },
  })
})

const login: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body

  const result = await AuthService.login(loginData)

  const { refreshToken, ...accessToken } = result

  // set refresh token in the browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logged in successfully',
    data: accessToken,
  })
})

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies

  const result = await AuthService.refreshToken(refreshToken)

  // set refresh token in the browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  })
})

const googleAuth: RequestHandler = catchAsync(async (req, res) => {
  const { tokenId } = req.body

  const result = await AuthService.googleAuth(tokenId)
  // console.log('result', result)
  let refreshToken, accessToken
  if (result) {
    ;({ refreshToken, ...accessToken } = result)
  }
  // set refresh token in the browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user logged in successfully',
    data: accessToken,
  })
})

export const AuthController = {
  createUser,
  createDriver,
  createAdmin,
  login,
  refreshToken,
  googleAuth,
}
