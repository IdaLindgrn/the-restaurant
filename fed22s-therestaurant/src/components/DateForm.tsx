import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IBooking, defaultBooking } from "../models/IBooking";
import setBookingLs from "../utils/setLS";
import SittingForm from "./SittingForm";
import { ValuePiece } from "../utils/valuePiece";
import { Wrapper } from "./styled/Wrappers";
import { BookingDispatchContext } from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingReducer";
import { StyledP } from "./styled/StyledP";

interface IDateFormProps {
  dateForm: boolean;
  showDateForm: (showDate: boolean) => void;
  showCustomerForm: (showCustomer: boolean) => void;
}

const DateForm = ({
  dateForm,
  showDateForm,
  showCustomerForm,
}: IDateFormProps) => {
  const dispatch = useContext(BookingDispatchContext);
  const [date, setDate] = useState<ValuePiece | [ValuePiece, ValuePiece]>(
    new Date()
  );
  const [showTime, setShowTime] = useState(false);

  const handlePeopleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: ActionType.NUMBEROFPEOPLE, payload: e.target.value });
  };

  const handleDateChange = (date: ValuePiece | [ValuePiece, ValuePiece] | null) => {
    setDate(date);
    const chosenDate = date instanceof Date ? date : date?.[0] || null;
    dispatch({ type: ActionType.DATE, payload: chosenDate });
    setShowTime(true);
  };  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <>
      <div>
        {" "}
        {dateForm ? (
          <Wrapper>
            <form onSubmit={handleSubmit}>
              <label htmlFor="guests">
                <StyledP>Antal gäster:</StyledP>
              </label>
              <select
                name="numberOfPeople"
                id="guests"
                onChange={handlePeopleChange}
                style={{ fontFamily: "Poppins" }}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <Calendar
                onChange={handleDateChange}
                value={date}
                minDate={new Date()}
              />
            </form>
            <SittingForm
              showTime={showTime}
              showDateForm={showDateForm}
              showCustomerForm={showCustomerForm}
            />
          </Wrapper>
        ) : null}
      </div>
    </>
  );
};

export default DateForm;
