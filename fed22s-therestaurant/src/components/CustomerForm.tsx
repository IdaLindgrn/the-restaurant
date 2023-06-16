import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { createNewBooking } from "../services/bookingServices";
import { ChangeEvent, useContext, useState } from "react";
import { Wrapper } from "./styled/Wrappers";
import { Loader } from "./styled/Loader";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingReducer";
import axios from "axios";
import { IBooking } from "../models/IBooking";
import BookingConfirmation from "./BookingConfirmation";
import CannotBook from "./CannotBook";
import { createEmail } from "../services/mailServices";
import { Button } from "./styled/Buttons";
interface ICustomerFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
}

interface ICustormerFormProps {
  showForm: boolean;
  showCustomerForm: (showCustomer: boolean) => void;
  showConfirmation: (show: boolean) => void;
  showCannotPlaceBooking: (show: boolean) => void;
}

const CustomerForm = ({
  showForm,
  showCustomerForm,
  showConfirmation,
  showCannotPlaceBooking,
}: ICustormerFormProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const booking = useContext(BookingContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICustomerFormInput>({
    criteriaMode: "all",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    switch (name) {
      case "firstName":
        dispatch({ type: ActionType.FIRSTNAME, payload: e.target.value });
        break;

      case "lastName":
        dispatch({ type: ActionType.LASTNAME, payload: e.target.value });
        break;

      case "email":
        dispatch({ type: ActionType.EMAIL, payload: e.target.value });
        break;

      case "phoneNumber":
        dispatch({ type: ActionType.PHONENUMBER, payload: e.target.value });
        break;

      default:
        break;
    }
  };
  const [disabled, setDisabled] = useState(true);

  const isDisabled = () => {
    setDisabled(!disabled);
  };

  const [loaderValue, setLoaderValue] = useState(false);

  const checkIfBookingPossible = async () => {
    const { sitting, numberOfPeople } = booking;
    setLoaderValue(true);

    try {
      const bookingDate = new Date(booking.date.toString())
        .toLocaleDateString()
        .replace(/-/g, "/");
      const formattedBookingDate = bookingDate.split("/").join("-");

      const url = `http://localhost:4000/api/v1/bookings/date/${formattedBookingDate}?sitting=${sitting}`;

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

      console.log(totalPeopleForSittingAndDate);

      // Calculate the remaining available seats in the sitting
      const remainingSeats = 90 - totalPeopleForSittingAndDate;

      // Calculate the number of tables needed based on the number of guests and the table capacity
      const tablesNeeded = Math.ceil(numberOfPeople / 6);

      // Calculate the total number of seats needed based on the number of tables needed
      const seatsNeeded = tablesNeeded * 6;

      if (seatsNeeded > remainingSeats) {
        console.log(
          `The booking exceeds the available seats. Maximum capacity for the sitting is ${remainingSeats}.`
        );
        setTimeout(() => {
          showCustomerForm(false);
          showCannotPlaceBooking(true);
        }, 3000)
        return;
      } else {
        setTimeout(() => {
          showCustomerForm(false);
          showConfirmation(true);
        }, 3000)
      }

      const newBooking: IBooking = {
        table: [],
        numberOfPeople: seatsNeeded,
        actualNumberOfGuests: numberOfPeople, // Use the original number of guests as the actual number
        sitting,
        date: formattedBookingDate,
        firstName: booking.firstName,
        lastName: booking.lastName,
        email: booking.email,
        phoneNumber: booking.phoneNumber,
        _id: booking._id,
      };

      existingBookings.push(newBooking);
      console.log(existingBookings);

      setTimeout(async () => {
        setLoaderValue(false);
        const response = await createNewBooking(newBooking);
        dispatch({ type: ActionType.GOTBOOKINGID, payload: response._id });

        await createEmail(
          booking.email,
          booking.firstName,
          new Date(booking.date).toLocaleDateString(),
          response._id
        );
      }, 3000);
    } catch (error) {
      console.log("Error checking availability:", error);
    }
  };

  const onSubmit: SubmitHandler<ICustomerFormInput> = async (data) => {
    const { firstName, lastName, email, phoneNumber } = data;

    dispatch({ type: ActionType.FIRSTNAME, payload: firstName });
    dispatch({ type: ActionType.LASTNAME, payload: lastName });
    dispatch({ type: ActionType.EMAIL, payload: email });
    dispatch({ type: ActionType.PHONENUMBER, payload: phoneNumber });

    await checkIfBookingPossible();
  };

  return (
    <div>
      {showForm ? (
        <Wrapper>
          {loaderValue ? (
            <Loader>
              <span className="loader"></span>
            </Loader>
          ) : (
            <></>
          )}
          <div>
            <p>
              <b>Datum:</b>{" "}
              {new Date(booking.date.toString()).toLocaleDateString()}
            </p>
            <p>
              <b>Gäster:</b> {booking.numberOfPeople.toString()}
            </p>
            <p>
              <b>Tid:</b>{" "}
              {booking.sitting.toString() === "1" ? "18-20:30" : "21-23.30"}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Förnamn"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "Detta fält är obligatoriskt",
                },
                maxLength: {
                  value: 80,
                  message: "Texten överskrider maxgränsen.",
                },
                minLength: {
                  value: 2,
                  message: "Du måste ange minst 2 tecken.",
                },
              })}
              name="firstName"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
            <input
              type="text"
              placeholder="Efternamn"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "Detta fält är obligatoriskt",
                },
                maxLength: {
                  value: 100,
                  message: "Texten överskrider maxgränsen.",
                },
                minLength: {
                  value: 2,
                  message: "Du måste ange minst 2 tecken.",
                },
              })}
              name="lastName"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
            <input
              type="email"
              placeholder="Mailadress"
              {...register("email", {
                required: {
                  value: true,
                  message: "Detta fält är obligatoriskt",
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Du måste ange en korrekt mailadress.",
                },
              })}
              name="email"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
            <input
              type="tel"
              placeholder="Telefonnummer"
              {...register("phoneNumber", {
                required: {
                  value: true,
                  message: "Detta fält är obligatoriskt",
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Måste ange ett korrekt telefonnummer.",
                },
                minLength: {
                  value: 10,
                  message: "Måste vara 10 tecken.",
                },
                maxLength: {
                  value: 10,
                  message: "Måste vara 10 tecken.",
                },
              })}
              name="phoneNumber"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <ErrorMessage
              errors={errors}
              name="phoneNumber"
              render={({ messages }) => {
                console.log("messages", messages);
                return messages
                  ? Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  : null;
              }}
            />
            <br />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <label htmlFor="gdprCheck">
                Jag godkänner hanteringen av mina personuppgifter.
              </label>
              <input type="checkbox" onChange={isDisabled} id="gdprCheck" />
            </div>
            <Button
              bgcolor="green"
              color="white"
              fontSize="1rem"
              type="submit"
              disabled={disabled}
            >
              Boka
            </Button>
          </form>
        </Wrapper>
      ) : null}
    </div>
  );
};

export default CustomerForm;
