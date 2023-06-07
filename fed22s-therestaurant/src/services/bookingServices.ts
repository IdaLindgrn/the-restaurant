import axios from "axios";
import { IBooking } from "../models/IBooking";

export async function getAllBookings() {
  let response = await axios.get<IBooking[]>(
    "http://localhost:4000/api/v1/bookings"
  );
  console.log(response.data);
  return response.data;
}

export async function getBookingById() {
  let response = await axios.get<IBooking>(
    "http://localhost:4000/api/v1/bookings/:bookingId"
  );
  console.log(response.data);
  return response.data;
}

export async function createNewBooking() {
  let response = await axios.post<IBooking>(
    "http://localhost:4000/api/v1/bookings",
    {
      table: [1],
      numberOfPeople: 2,
      sitting: 18,
      email: "email@mail.com",
      phoneNumber: "0701234568",
      date: Date.now(),
    }
  );
  console.log(response.data);
  console.log("Booking added");
  return response.data;
}

export async function deleteBookingById() {
  let response = await axios.delete<IBooking>(
    "http://localhost:4000/api/v1/bookings/:bookingId"
  );
  console.log(response.data);
  console.log("Booking deleted");
  return response.data;
}

export async function updateBookingById() {
  let response = await axios.put<IBooking>(
    "http://localhost:4000/api/v1/bookings/:bookingId",
    {
      sitting: 1,
    }
  );
  console.log(response.data);
  console.log("Booking updated");

  return response.data;
}