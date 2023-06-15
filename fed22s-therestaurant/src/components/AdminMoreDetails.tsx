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

interface FilterBookingsProps {
  booking: IBooking;
}

interface IUpdateBookingFormInput {
  firstName: string;
  lastName: string;
  numberOfPeople: number;
  sitting: number;
  date: string;
}

export const AdminMoreDetails = ({ booking }: FilterBookingsProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const { handleSubmit, register } = useForm<IUpdateBookingFormInput>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    switch (name) {
      case "firstName":
        dispatch({ type: ActionType.FIRSTNAME, payload: e.target.value });
        break;

      case "lastName":
        dispatch({ type: ActionType.LASTNAME, payload: e.target.value });
        break;

      case "numberOfPeople":
        dispatch({ type: ActionType.NUMBEROFPEOPLE, payload: e.target.value });
        break;

      case "sitting":
        dispatch({ type: ActionType.SITTING, payload: e.target.value });
        break;

      default:
        break;
    }
    console.log(ActionType.FIRSTNAME);
  };

  async function saveBooking(id: string, updatedBooking: IBooking) {
    await updateBookingById(id, updatedBooking);
    console.log("Booking updated");
  }

  function removeBooking(id: string) {
    deleteBookingById(id);
  }
  const onSubmit: SubmitHandler<IUpdateBookingFormInput> = async (data) => {
    const { firstName, lastName, numberOfPeople, sitting, date } = data;

    dispatch({ type: ActionType.FIRSTNAME, payload: firstName });
    dispatch({ type: ActionType.LASTNAME, payload: lastName });
    dispatch({ type: ActionType.NUMBEROFPEOPLE, payload: numberOfPeople });
    dispatch({ type: ActionType.SITTING, payload: sitting });
    dispatch({ type: ActionType.DATE, payload: date });

    const updatedBooking: IBooking = {
      table: booking.table,
      numberOfPeople: numberOfPeople || booking.numberOfPeople,
      actualNumberOfGuests: numberOfPeople || booking.numberOfPeople, // Use the original number of guests as the actual number
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
                  defaultValue={booking?.numberOfPeople}
                  {...register("numberOfPeople")}
                  name="numberOfPeople"
                  onChange={handleChange}
                  style={{ fontFamily: "Poppins" }}
                  min={1}
                  max={12}
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
