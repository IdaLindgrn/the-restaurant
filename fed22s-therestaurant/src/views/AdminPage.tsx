import { useEffect, useState, useReducer } from "react";
import { IBooking, defaultBooking } from "./../models/IBooking";
import { getAllBookings } from "../services/bookingServices";
import FilterBookings from "../components/FilterBookings";
import { AdminTable } from "../components/AdminTable";
import { StyledH1 } from "../components/styled/StyledH1";

import BookingReducer from "../reducers/BookingReducer";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import setBookingsLs from "../utils/setLS";

const AdminPage = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [booking, dispatch] = useReducer(BookingReducer, defaultBooking);

  useEffect(() => {
    const getData = async () => {
      getAllBookings().then((bookings) => {
        setBookings(bookings);
        setBookingsLs(bookings);
      });
    };
    getData();
  }, []);

  return (
    <>
      <BookingContext.Provider value={booking}>
        <BookingDispatchContext.Provider value={dispatch}>
          <StyledH1 fontSize="2rem">Admin</StyledH1>
          <FilterBookings
            bookings={bookings}
            set={setBookings}
          ></FilterBookings>
          <AdminTable bookings={bookings} set={setBookings}></AdminTable>
        </BookingDispatchContext.Provider>
      </BookingContext.Provider>
    </>
  );
};

export default AdminPage;
