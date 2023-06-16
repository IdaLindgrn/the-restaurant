import { useReducer, useState } from "react";
import CustomerForm from "../components/CustomerForm";
import DateForm from "../components/DateForm";
import { defaultBooking } from "../models/IBooking";
import { useNavigate } from "react-router-dom";
import { GDPRButton } from "../components/styled/Buttons";
import { GeneralWrapper } from "../components/styled/Wrappers";
import {
  BookingContext,
  BookingDispatchContext,
} from "../contexts/BookingContext";
import BookingReducer from "../reducers/BookingReducer";
import BookingConfirmation from "../components/BookingConfirmation";
import CannotBook from "../components/CannotBook";

const BookingPage = () => {
  const navigate = useNavigate();

  const [booking, dispatch] = useReducer(BookingReducer, defaultBooking);
  const [showDateForm, setDateForm] = useState(true);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showCannotBook, setShowCannotBook] = useState(false);

  return (
    <BookingContext.Provider value={booking}>
      <BookingDispatchContext.Provider value={dispatch}>
        <GeneralWrapper flexdirection="column">
          <DateForm
            dateForm={showDateForm}
            showDateForm={setDateForm}
            showCustomerForm={setShowCustomerForm}
          ></DateForm>
          <CustomerForm
            showForm={showCustomerForm}
            showCustomerForm={setShowCustomerForm}
            showConfirmation={setShowBookingConfirmation}
            showCannotPlaceBooking={setShowCannotBook}
          ></CustomerForm>
          <BookingConfirmation
            show={showBookingConfirmation}
          ></BookingConfirmation>
          <CannotBook
            show={showCannotBook}
          ></CannotBook>
            <GDPRButton bgcolor="gray" color="white" fontSize="0.8rem" onClick={() => navigate("/gdpr")}>
              Personuppgiftspolicy
            </GDPRButton>
        </GeneralWrapper>
      </BookingDispatchContext.Provider>
    </BookingContext.Provider>
  );
};

export default BookingPage;
