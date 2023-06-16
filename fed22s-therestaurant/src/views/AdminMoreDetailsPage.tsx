import { useEffect, useState } from "react";
import AdminMoreDetails from "../components/AdminMoreDetails";
import { IBooking } from "../models/IBooking";
import { getBookingById } from "../services/bookingServices";
import { useParams } from "react-router";

const AdminMoreDetailsPage = () => {
  const [booking, setBooking] = useState<IBooking>();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        getBookingById(id).then((booking) => {
          setBooking(booking);
        });
      }
    };
    getData();
  }, [id]);

  console.log(booking);

  return (
    <>{booking && <AdminMoreDetails booking={booking}></AdminMoreDetails>}</>
  );
};

export default AdminMoreDetailsPage;
