/* eslint-disable no-unused-vars */

// admin.model.ts
export interface AdminModel {
  name: string;
  email: string;
  address: string;
  password: string;
  image: string;
}

// driver.model.ts
export interface DriverModel {
  name: string;
  image: string;
  age: number;
  phone: string;
  email: string;
  driving_license: string;
  experience: string;
  address: string;
  joining_date: string;
  driving_status: string;
}

// traveller.model.ts
export interface TravellerModel {
  name: string;
  image: string;
  age: number;
  phone: string;
  email: string;
}

export interface UserModel {
  email: string;
  password: string;
  role: 'admin' | 'traveller' | 'driver';
  admin_id?: string;
  traveller_id?: string;
  driver_id?: string;
}


export type IUser = {
  _id: string;
  password: string;
  role: 'user' | 'admin';
  name: string;
  email: string;
  phone: string;
};

export type IUserMethods = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, 'role' | 'password' | '_id'> | null>;

  isPasswordMatch(givenPassword: string, savedPassword: string): boolean;
};

// export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IUserFilter = {
  searchTerm?: string;
  role?: string;
  phoneNumber?: string;
  address?: string;
};
