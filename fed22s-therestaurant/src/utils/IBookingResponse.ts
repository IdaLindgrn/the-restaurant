import { IBooking } from "../models/IBooking";

interface IBookingResponse {
  data: IBooking[];
}

export interface IBookingResponseOne {
  data: IBooking;
}

export default IBookingResponse;
