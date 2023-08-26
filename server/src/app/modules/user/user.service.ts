/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { bcryptHelpers } from '../../../helper/bcryptHelpers';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { UserSearchableFields } from './user.constants';
import { IUser, IUserFilter } from './user.interface';
import { User } from './user.model';

const getAllUsers = async (
  filters: IUserFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: UserSearchableFields?.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortCondition: '' | { [key: string]: SortOrder } = sortBy &&
    sortOrder && { [sortBy]: sortOrder };

  const whereCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }

  const { name, ...userData } = payload;
  const updateUserData: Partial<IUser> = { ...userData };

  // dynamically handling nested fields
  if (name && Object.keys(name)?.length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updateUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updateUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findOneAndDelete({ _id: id });
  return result;
};

const getMyProfile = async (
  payload: JwtPayload | null
): Promise<IUser | null> => {
  let result = null;

  result = await User.findById({ _id: payload?.id });

  return result;
};

const updateMyProfile = async (
  user: JwtPayload | null,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: user?.id });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'user not found');
  }

  const { name, password, ...userData } = payload;
  const updateUserData: Partial<IUser> = { ...userData };

  // dynamically handling nested fields
  if (name && Object.keys(name)?.length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updateUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  // hash the password before updating
  if (password) {
    (updateUserData as any)['password'] = await bcryptHelpers.hashPassword(
      password
    );
  }

  const result = await User.findOneAndUpdate(
    { _id: user?.id },
    updateUserData,
    {
      new: true,
    }
  );
  return result;
};


/* 
const updateUserProfile = async (userId: string, updatedUserData: any): Promise<User | null> => {
  // Update the user's profile
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

  return updatedUser;
};

const updateTravellerProfile = async (travellerId: string, updatedTravellerData: any): Promise<Traveller | null> => {
  // Update the traveller's profile
  const updatedTraveller = await Traveller.findByIdAndUpdate(travellerId, updatedTravellerData, { new: true });

  return updatedTraveller;
};

*/

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};



/* const getUserProfile = async (payload: any) => {
  const userInfo = await User.findOne({ email: payload?.email });
  const { model, id } = userInfo?.admin_id ? { model: Admin, id: userInfo?.admin_id } : userInfo?.traveller_id ? { model: Traveller, id: userInfo?.traveller_id } : { model: Driver, id: userInfo?.driver_id };

  const result = await model.findById(id);

  return {
    result,
    userInfo,
  };
} */