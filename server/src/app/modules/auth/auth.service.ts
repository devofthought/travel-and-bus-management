/* eslint-disable no-constant-condition */
import { OAuth2Client } from 'google-auth-library'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import mongoose from 'mongoose'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helper/jwtHelpers'
import { Admin } from '../admin/admin.modal'
import { IDriver } from '../driver/driver.interface'
import { Driver } from '../driver/driver.model'
import { Traveler } from '../traveler/traveler.modal'
import { IUser } from '../user/user.interface'
import { User } from '../user/user.model'
import {
  IRefreshTokenResponse,
  IUserLogin,
  IUserLoginResponse,
} from './auth.interface'
import { generatedDriverCode } from '../driver/driver.utils'

// oauthj cilent code
const cilent = new OAuth2Client(
  '902731341146-i96tb5ehl1hlog621ba6qamdfss3qob1.apps.googleusercontent.com'
)

const createTraveler = async (payload: IUser): Promise<any> => {
  let newUserAllData: IUser | null = null

  const user = new User()
  const isUserExist = await user.isUserExist(payload.email)

  if (isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'email already exists')
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    //array
    const newTraveler = await Traveler.create([payload], { session })
    if (!newTraveler.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create a traveler')
    }

    const user = {
      ...payload,
      traveler_id: newTraveler[0]._id,
      role: 'traveler',
    }

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id })
      .populate('driver_id')
      .populate('traveler_id')
      .populate('admin_id')
  }
  let accessToken
  let refreshToken
  if (newUserAllData) {
    accessToken = jwtHelpers.createToken(
      {
        id: newUserAllData._id,
        role: newUserAllData.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    )

    refreshToken = jwtHelpers.createToken(
      {
        id: newUserAllData._id,
        role: newUserAllData.role,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    )
  }
  return { result: newUserAllData, refreshToken, accessToken }
}

const createDriver = async (payload: IDriver): Promise<any> => {
  const driverData = { ...payload }
  const driver_code = await generatedDriverCode() // generated driver code

  let newDriverData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()

    const isEmailHas= await User.findOne({email:payload.email})
    if(isEmailHas){
      throw new ApiError(httpStatus.BAD_REQUEST, 'email is not a valid email')
    }
    const isPhoneHas= await Driver.findOne({phone:payload.phone})
    if(isPhoneHas){
      throw new ApiError(httpStatus.BAD_REQUEST, 'phone is not a valid phone')
    }
    //array
    driverData.joining_date = new Date().toISOString()
    driverData.driver_code = driver_code
    const newDriver = await Driver.create([driverData], { session })
    if (!newDriver.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create a driver')
    }

    const user = {
      name: payload.name,
      email: payload.email,
      driver_id: newDriver[0]._id,
      role: 'driver',
      password: config.default_driver_password as string,
    }

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // TODO: send a welcome email to driver email.
    newDriverData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newDriverData) {
    newDriverData = await User.findOne({ _id: newDriverData.id })
      .populate('driver_id')
      .populate('traveler_id')
      .populate('admin_id')
  }
  return { result: newDriverData }
}

const createAdmin = async (payload: IDriver): Promise<any> => {
  const adminData = { ...payload }
  let newAdminAllData = null
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    //array
    const newAdmin = await Admin.create([adminData], { session })
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create a admin')
    }

    const user = {
      name: payload.name,
      email: payload.email,
      admin_id: newAdmin[0]._id,
      role: 'admin',
      password: config.default_admin_password as string,
    }

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newAdminAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newAdminAllData) {
    newAdminAllData = await User.findOne({ _id: newAdminAllData.id })
      .populate('driver_id')
      .populate('traveler_id')
      .populate('admin_id')
  }
  return { result: newAdminAllData }
}

const login = async (payload: IUserLogin): Promise<IUserLoginResponse> => {
  const user = new User()
  const isUserExist = await user.isUserExist(payload.email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  if (
    isUserExist.password &&
    !(await user.isPasswordMatch(payload.password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid password')
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    {
      id: isUserExist._id,
      role: isUserExist.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  const userData = await User.findOne({ _id: isUserExist._id })

  return {
    userData,
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }

  const { id, role } = verifiedToken

  // check if user exists of not
  const isUserExist = await User.findOne({ _id: id })

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: id,
      role: role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken,
  }
}

const googleAuth = async (
  tokenId: string
): Promise<IUserLoginResponse | void> => {
  try {
    const response = await cilent.verifyIdToken({
      idToken: tokenId,
      audience:
        '733785501526-kf7fkkbo5i29t9kjq2npllh2fd14fvhj.apps.googleusercontent.com',
    })

    const payload = response.getPayload()
    if (!payload) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Payload not found!')
    }

    const { name, email, email_verified, family_name } = payload

    if (!email_verified) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Cannot login! Try a different way.'
      )
    }

    let userExists = await User.findOne({ email: email })

    if (!userExists) {
      userExists = await User.create({
        name: name,
        email: email,
        password: family_name + '@1234',
        role: 'user',
        phone: email,
      })
    }

    const accessToken = jwtHelpers.createToken(
      {
        id: userExists._id,
        role: userExists.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    )

    const refreshToken = jwtHelpers.createToken(
      {
        id: userExists._id,
        role: userExists.role,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    )

    return {
      userData: userExists,
      accessToken,
      refreshToken,
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Something went wrong.'
    )
  }
}

export const AuthService = {
  createTraveler,
  createDriver,
  createAdmin,
  login,
  refreshToken,
  googleAuth,
}
