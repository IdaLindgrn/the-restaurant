import { useEffect } from "react";
import { getAllBookings, deleteBookingById } from "../services/bookingServices";
import { IBooking } from "../models/IBooking";
import { TableWrapper } from "./styled/Wrappers";
import { Button } from "./styled/Buttons";
import { useNavigate } from "react-router-dom";
import { Table, TableData, TableHeader, TableRow } from "./styled/Table";

interface FilterBookingsProps {
  bookings: IBooking[];
  set: (bookings: IBooking[]) => void;
}

export const AdminTable = ({ bookings, set }: FilterBookingsProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const getBookings = async () => {
      getAllBookings().then((bookings) => {
        set(bookings);
      });
    };
    getBookings();
  }, []);

  const todaysBookings = bookings.filter((booking) => {
    return (
      new Date(booking.date).toLocaleDateString() ==
      new Date().toLocaleDateString()
    );
  });

  async function RemoveBooking(id: string) {
    console.log(id);
    const response = await deleteBookingById(id);
    set(bookings.filter((booking) => booking._id !== id));
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          bgcolor="black"
          color="white"
          fontSize="1rem"
          onClick={() => {
            set(todaysBookings);
          }}
        >
          Visa dagens bokningar
        </Button>

        <Button
          bgcolor="black"
          color="white"
          fontSize="1rem"
          onClick={() => navigate("/book")}
        >
          Boka bord
        </Button>
      </div>
      <TableWrapper>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Datum</TableHeader>
              <TableHeader>Förnamn</TableHeader>
              <TableHeader>Efternamn</TableHeader>
              <TableHeader>Gäster</TableHeader>
              <TableHeader>Sittning</TableHeader>
            </TableRow>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <TableRow>
                <TableData>
                  {new Date(booking.date).toLocaleDateString()}
                </TableData>
                <TableData>{booking.firstName}</TableData>
                <TableData>{booking.lastName}</TableData>
                <TableData>{booking.numberOfPeople.toString()}</TableData>
                <TableData>{booking.sitting.toString()}</TableData>
                <TableData>
                  <Button
                    bgcolor="black"
                    color="white"
                    fontSize="0.7rem"
                    onClick={() => navigate("/admin/" + booking._id)}
                  >
                    Ändra
                  </Button>
                </TableData>
                <TableData>
                  <Button
                    bgcolor="red"
                    color="white"
                    fontSize="0.7rem"
                    type="button"
                    onClick={() => RemoveBooking(booking._id)}
                  >
                    Ta Bort
                  </Button>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </>
  );
};
