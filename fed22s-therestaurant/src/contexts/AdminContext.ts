import { Dispatch, createContext } from "react";
import { IAction } from "../reducers/BookingReducer";
import { IBooking } from "../models/IBooking";

export const AdminContext = createContext<IBooking[]>([]);

export const AdminDispatchContext = createContext<Dispatch<IAction>>(() => {
  return;
});
