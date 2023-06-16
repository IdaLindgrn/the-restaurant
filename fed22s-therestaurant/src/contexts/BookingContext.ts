import { Dispatch, createContext } from "react";
import { IBooking, defaultBooking } from "../models/IBooking";
import { IAction } from "../reducers/BookingReducer";

export const BookingContext = createContext<IBooking>(defaultBooking);

export const BookingDispatchContext = createContext<Dispatch<IAction>>(() => {
  return;
});
