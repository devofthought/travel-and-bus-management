import { RequestHandler } from 'express'
import httpStatus from 'http-status'
import { paginationFields } from '../../../constants/pagination'
import catchAsync from '../../../shared/catchAsync'
import { pick } from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { UserFilterableFields } from './user.constants'
import { IUser } from './user.interface'
import { UserService } from './user.service'

const getAllUser: RequestHandler = catchAsync(async (req, res) => {
  const filters = pick(req.query, UserFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await UserService.getAllUsers(filters, paginationOptions)
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'users retrived successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await UserService.getSingleUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrived successfully',
    data: result,
  })
})

const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const updateData = req.body

  const result = await UserService.updateUser(id, updateData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user updated successfully',
    data: result,
  })
})

const updateUserEmail: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user
  const updateData = req.body

  const result = await UserService.updateUserEmail(user, updateData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user email updated successfully',
    data: result,
  })
})

const updateUserPassword: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user
  const updateData = req.body

  const result = await UserService.updateUserPassword(user, updateData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user password updated successfully',
    data: result,
  })
})

const deleteUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await UserService.deleteUser(id)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user deleted successfully',
    data: result,
  })
})

const getMyProfile: RequestHandler = catchAsync(async (req, res) => {
  const user = req.user
  const result = await UserService.getMyProfile(user)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information retrieved successfully",
    data: result,
  })
})

const updateMyProfile: RequestHandler = catchAsync(async (req, res) => {
  const { ...updateData } = req.body
  const user = req.user

  const result = await UserService.updateMyProfile(user, updateData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's information updated successfully",
    data: result,
  })
})

/* 
 const updateUserProfileController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;

  const updatedUser = await updateUserProfile(userId, updatedUserData);

  if (updatedUser) {
    res.status(200).json(updatedUser);
  } else {
    next(new Error('Failed to update user profile.'));
  }
});

 const updateTravellerProfileController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const travellerId = req.params.travellerId;
  const updatedTravellerData = req.body;

  const updatedTraveller = await updateTravellerProfile(travellerId, updatedTravellerData);

  if (updatedTraveller) {
    res.status(200).json(updatedTraveller);
  } else {
    next(new Error('Failed to update traveller profile.'));
  }
});

*/

export const UserController = {
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
  updateUserEmail,
  updateUserPassword,
}
