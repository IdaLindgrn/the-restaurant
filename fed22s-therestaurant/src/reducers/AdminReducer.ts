import { IBooking } from "../models/IBooking";
import { getAllBookings } from "../services/bookingServices";

export enum ActionType {
  BOOKINGS,
  FILTEREDBOOKINGS,
}

export interface IAction {
  type: ActionType;
  payload: any;
}
const AdminReducer = (bookings: IBooking[], action: IAction): IBooking[] => {
  switch (action.type) {
    case ActionType.BOOKINGS: {
      getAllBookings().then((bookings) => {
        return [bookings];
      });
    }

    default: {
      return bookings;
    }
  }
};

export default AdminReducer;
