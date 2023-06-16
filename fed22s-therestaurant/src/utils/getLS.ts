import { IBooking } from "../models/IBooking";

const bookingFromLS: IBooking[] = JSON.parse(
  localStorage.getItem("bookings") || "[]"
);

export default bookingFromLS;
