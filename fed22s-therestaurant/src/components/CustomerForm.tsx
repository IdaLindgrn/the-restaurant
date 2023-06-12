import { useForm, SubmitHandler } from "react-hook-form";
import { createNewBooking } from "../services/bookingServices";
import { ChangeEvent, useContext, useState } from "react";
import { Wrapper } from "./styled/Wrappers";
import { BookingContext, BookingDispatchContext } from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingReducer";
import axios from "axios";

interface ICustomerFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface IBooking extends ICustomerFormInput {
  _id: string;
  table: number[];
  numberOfPeople: number;
  sitting: number;
  date: Date;
}

interface ICustormerFormProps {
  showForm: boolean;
}

const CustomerForm = ({ showForm }: ICustormerFormProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const booking = useContext(BookingContext);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICustomerFormInput>();

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

  const onSubmit: SubmitHandler<ICustomerFormInput> = async (data) => {
    const { firstName, lastName, email, phoneNumber } = data;
    const { sitting, date, numberOfPeople } = booking;
  
    let availableTables: number[] = [];
    let occupiedTables: number[] = [];
    let existingBookings: IBooking[] = [];
  
    try {
      const bookingDate = new Date(date);
  
      const url = `http://localhost:4000/api/v1/bookings/date/${bookingDate.toISOString().slice(0, 10)}?sitting=${sitting}`;
      const response = await axios.get<any>(url);
  
      existingBookings = response.data.data;
  
      const tableSize = 6;
      const tablesPerSitting = 15;
  
      const tablesNeeded = Math.ceil(numberOfPeople / tableSize);
  
      occupiedTables = existingBookings.reduce((tables: number[], booking: IBooking) => {
        if (Array.isArray(booking.table)) {
          tables.push(...booking.table);
        } else {
          tables.push(booking.table);
        }
        return tables;
      }, []);
  
      console.log(occupiedTables);
  
      if (occupiedTables.length + tablesNeeded > tablesPerSitting) {
        console.log("No available tables for the selected sitting and date.");
        return;
      } else {
        let remainingTablesNeeded = tablesNeeded;
        let currentTableNumber = 1;
  
        while (
          remainingTablesNeeded > 0 &&
          currentTableNumber <= tablesPerSitting
        ) {
          if (occupiedTables.includes(currentTableNumber)) {
            currentTableNumber++;
            continue;
          }
  
          availableTables.push(currentTableNumber);
          remainingTablesNeeded--;
          currentTableNumber++;
        }
  
        if (availableTables.length === 0) {
          console.log("No available tables for the selected sitting and date.");
          return;
        }
      }
    } catch (error) {
      console.log("Error fetching existing bookings:", error);
      return;
    }
  
    const newBooking: IBooking = {
      _id: "",
      table: availableTables,
      numberOfPeople,
      sitting,
      firstName,
      lastName,
      email,
      phoneNumber,
      date: new Date(date.toString()),
    };
  
    createNewBooking(newBooking);
  };
  
  return (
    <div>
      {showForm ? (
        <Wrapper>
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
              {booking.sitting === 1 ? "18-20:30" : "21-23.30"}
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Förnamn"
              {...register("firstName", { required: true, maxLength: 80 })}
              name="firstName"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <input
              type="text"
              placeholder="Efternamn"
              {...register("lastName", { required: true, maxLength: 100 })}
              name="lastName"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <input
              type="email"
              placeholder="Mailadress"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              name="email"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <input
              type="tel"
              placeholder="Telefonnummer"
              {...register("phoneNumber", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
              name="phoneNumber"
              onChange={handleChange}
              style={{ fontFamily: "Poppins" }}
            />
            <br />
            <label htmlFor="gdprCheck">
              Jag godkänner hanteringen av mina personuppgifter.
            </label>
            <input type="checkbox" onChange={isDisabled} id="gdprCheck" />
            <input type="submit" disabled={disabled} />
          </form>
        </Wrapper>
      ) : null}
    </div>
  );
};

export default CustomerForm;
