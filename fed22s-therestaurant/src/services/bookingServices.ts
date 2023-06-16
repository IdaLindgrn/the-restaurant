import axios from "axios";
import { IBooking } from "../models/IBooking";
import IBookingResponse, {
  IBookingResponseOne,
} from "../utils/IBookingResponse";

export async function getAllBookings(): Promise<IBooking[]> {
  let response = await axios.get<IBookingResponse>(
    "http://localhost:4000/api/v1/bookings"
  );
  return response.data.data;
}

export async function getBookingById(id: string) {
  let response = await axios.get<IBookingResponseOne>(
    `http://localhost:4000/api/v1/bookings/${id}`
  );
  return response.data.data;
}

export async function getBookingsByDate(date: string, sitting: number) {
  const url = `http://localhost:4000/api/v1/bookings/date/${date}?sitting=${sitting}`;
  const response = await axios.get<any>(url);
  const bookings = response.data.data;
  return bookings;
}

export async function createNewBooking({
  numberOfPeople,
  actualNumberOfGuests, // Add the new field
  sitting,
  firstName,
  lastName,
  email,
  phoneNumber,
  date,
}: IBooking) {
  let response = await axios.post<IBooking>(
    "http://localhost:4000/api/v1/bookings",
    {
      table: [],
      numberOfPeople: numberOfPeople,
      actualNumberOfGuests: actualNumberOfGuests, // Include the new field
      sitting: sitting,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      date: date,
    }
  );
  return response.data;
}

export async function deleteBookingById(id: string) {
  let response = await axios.delete<IBooking>(
    `http://localhost:4000/api/v1/bookings/${id}`
  );
  return response.data;
}

export async function updateBookingById(
  id: string,
  {
    numberOfPeople,
    actualNumberOfGuests,
    sitting,
    date,
    firstName,
    lastName,
    email,
    phoneNumber,
  }: IBooking
): Promise<IBooking> {
  const updatedFields: Partial<IBooking> = {};

  if (numberOfPeople !== undefined) {
    updatedFields.numberOfPeople = numberOfPeople;
  }

  if (actualNumberOfGuests !== undefined) {
    updatedFields.actualNumberOfGuests = actualNumberOfGuests;
  }

  if (sitting !== undefined) {
    updatedFields.sitting = sitting;
  }

  if (date !== undefined) {
    updatedFields.date = date;
  }

  if (firstName !== undefined) {
    updatedFields.firstName = firstName;
  }

  if (lastName !== undefined) {
    updatedFields.lastName = lastName;
  }

  if (email !== undefined) {
    updatedFields.email = email;
  }

  if (phoneNumber !== undefined) {
    updatedFields.phoneNumber = phoneNumber;
  }

  let response = await axios.put<IBooking>(
    `http://localhost:4000/api/v1/bookings/${id}`,
    updatedFields
  );

  return response.data;
}
