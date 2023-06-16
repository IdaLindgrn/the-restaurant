import { Wrapper } from "../components/styled/Wrappers";
import {
  deleteBookingById,
  updateBookingById,
} from "../services/bookingServices";
import { Button } from "../components/styled/Buttons";
import { IBooking } from "../models/IBooking";
import { Link } from "react-router-dom";
import { Table, TableData, TableHeader, TableRow } from "./styled/Table";
import { useForm, SubmitHandler } from "react-hook-form";
import { ChangeEvent, useContext } from "react";
import { BookingDispatchContext } from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingReducer";
import "react-date-picker/dist/DatePicker.css";
import axios from "axios";

interface FilterBookingsProps {
  booking: IBooking;
}

interface IUpdateBookingFormInput {
  firstName: string;
  lastName: string;
  numberOfPeople: number;
  sitting: number;
  date: string;
  actualNumberOfGuests: number;
}

export const AdminMoreDetails = ({ booking }: FilterBookingsProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const { handleSubmit, register } = useForm<IUpdateBookingFormInput>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
  
    switch (name) {
      case "firstName":
        dispatch({ type: ActionType.FIRSTNAME, payload: value });
        break;
  
      case "lastName":
        dispatch({ type: ActionType.LASTNAME, payload: value });
        break;
  
      case "numberOfPeople":
        dispatch({ type: ActionType.NUMBEROFPEOPLE, payload: parseInt(value, 10) });
        break;
  
      case "sitting":
        dispatch({ type: ActionType.SITTING, payload: parseInt(value, 10) });
        break;
  
      case "actualNumberOfGuests":
        dispatch({ type: ActionType.ACTUALNUMBEROFGUESTS, payload: parseInt(value, 10) });
        break;
  
      default:
        break;
    }
  };  

  async function saveBooking(id: string, updatedBooking: IBooking) {
    await updateBookingById(id, updatedBooking);
    console.log("Booking updated");
  }

  function removeBooking(id: string) {
    deleteBookingById(id);
  }
  const onSubmit: SubmitHandler<IUpdateBookingFormInput> = async (data) => {
    const { firstName, lastName, sitting, date, actualNumberOfGuests } = data;
  
    const tablesNeeded = Math.ceil(actualNumberOfGuests / 6);
    const updatedNumberOfPeople = tablesNeeded * 6;
  
    // Check if the updated number of people exceeds the available seats
    const url = `http://localhost:4000/api/v1/bookings/date/${booking.date}?sitting=${sitting}`;
    let existingBookings: IBooking[] = [];
  
    try {
      const response = await axios.get<any>(url);
      existingBookings = response.data.data;
      console.log("Filtered Bookings:", existingBookings);
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.log("No existing bookings found for the selected date.");
      } else {
        throw error;
      }
    }
  
    // Calculate the total number of people already booked for the selected sitting and date
    const totalPeopleForSittingAndDate = existingBookings.reduce(
      (total, booking) => total + booking.numberOfPeople,
      0
    );
  
    // Calculate the remaining available seats in the sitting
    const remainingSeats = 90 - totalPeopleForSittingAndDate;
  
    // Calculate the seats needed for the updated booking
    const seatsNeeded = tablesNeeded * 6;
  
    if (seatsNeeded > remainingSeats) {
      console.log(
        `The booking exceeds the available seats. Maximum capacity for the sitting is ${remainingSeats}.`
      );
      // Handle the case where the booking cannot be updated
      return;
    }
  
    dispatch({ type: ActionType.FIRSTNAME, payload: firstName });
    dispatch({ type: ActionType.LASTNAME, payload: lastName });
    dispatch({ type: ActionType.NUMBEROFPEOPLE, payload: updatedNumberOfPeople });
    dispatch({ type: ActionType.ACTUALNUMBEROFGUESTS, payload: actualNumberOfGuests });
    dispatch({ type: ActionType.SITTING, payload: sitting });
    dispatch({ type: ActionType.DATE, payload: date });
  
    const updatedBooking: IBooking = {
      table: booking.table,
      numberOfPeople: updatedNumberOfPeople || booking.numberOfPeople,
      actualNumberOfGuests: actualNumberOfGuests || booking.actualNumberOfGuests,
      sitting: sitting || booking.sitting,
      date: booking.date,
      firstName: firstName || booking.firstName,
      lastName: lastName || booking.lastName,
      email: booking.email,
      phoneNumber: booking.phoneNumber,
      _id: "",
    };
  
    console.log(updatedBooking);
    console.log(booking._id);
    saveBooking(booking._id, updatedBooking);
  };

  return (
    <Wrapper>
      <Link to="/admin">
        <Button bgcolor="black" color="white" fontSize="0.7rem">
          Tillbaka
        </Button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Förnamn</TableHeader>
              <TableHeader>Efternamn</TableHeader>
              <TableHeader>Gäster</TableHeader>
              <TableHeader>Sittning</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            <TableRow>
              <TableData>
                <input
                  type="text"
                  defaultValue={booking?.firstName}
                  {...register("firstName")}
                  name="firstName"
                  onChange={handleChange}
                  style={{ fontFamily: "Poppins" }}
                  className="input__text"
                />
              </TableData>
              <TableData>
                <input
                  type="text"
                  defaultValue={booking?.lastName}
                  {...register("lastName")}
                  name="lastName"
                  onChange={handleChange}
                  style={{ fontFamily: "Poppins" }}
                  className="input__text"
                />
              </TableData>
              <TableData>
                <input
                  type="number"
                  defaultValue={booking.actualNumberOfGuests}
                  {...register("actualNumberOfGuests")}
                  name="actualNumberOfGuests"
                  onChange={handleChange}
                  style={{ fontFamily: "Poppins" }}
                  min={1}
                  max={90}
                  className="input__number"
                />
              </TableData>
              <TableData>
                <input
                  type="number"
                  defaultValue={booking?.sitting.toString()}
                  {...register("sitting")}
                  name="sitting"
                  onChange={handleChange}
                  style={{ fontFamily: "Poppins" }}
                  min={1}
                  max={2}
                  className="input__number"
                />
              </TableData>
              <TableData>
                <Button
                  bgcolor="black"
                  color="white"
                  fontSize="0.7rem"
                  type="submit"
                >
                  Spara
                </Button>
              </TableData>
              <TableData>
                <Button
                  bgcolor="red"
                  color="white"
                  fontSize="0.7rem"
                  type="button"
                  onClick={() => removeBooking(booking._id)}
                >
                  Ta Bort
                </Button>
              </TableData>
            </TableRow>
          </tbody>
        </Table>
      </form>
    </Wrapper>
  );
};

export default AdminMoreDetails;
