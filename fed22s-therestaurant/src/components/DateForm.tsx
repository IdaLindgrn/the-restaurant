import { ChangeEvent, FormEvent, useContext, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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

  const handlePeopleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.NUMBEROFPEOPLE, payload: e.target.value });
  };

  const handleDateChange = (date: ValuePiece | [ValuePiece, ValuePiece]) => {
    setDate(date);
    const chosenDate = date?.toString() as string;
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <label htmlFor="guests">
                  <StyledP>Antal gäster:</StyledP>
                </label>

                <input
                  type="number"
                  name="numberOfPeople"
                  id="guests"
                  onChange={handlePeopleChange}
                  style={{ fontFamily: "Poppins" }}
                  min="1"
                  max="90"
                  placeholder="1"
                ></input>
              </div>
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
