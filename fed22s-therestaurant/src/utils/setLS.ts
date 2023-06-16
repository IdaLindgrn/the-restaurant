import { IBooking } from "../models/IBooking";

const setBookingsLs = (bookings: IBooking[]) => {
  localStorage.setItem("bookings", JSON.stringify(bookings));
};

export default setBookingsLs;
