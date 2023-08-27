import { Document } from 'mongoose';

export interface BookingInterface extends Document {
  user_id: string;
  trip_id: string;
  booking_seat: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  payment_id?: string;
}

export interface BookingCreateDTO {
  user_id: string;
  trip_id: string;
  booking_seat: string;
}

export interface BookingUpdateDTO {
  status: string;
}
