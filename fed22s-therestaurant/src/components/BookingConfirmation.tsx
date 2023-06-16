import { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import { StyledP } from "./styled/StyledP";
import { Wrapper } from "./styled/Wrappers";

interface BookingConfirmationProps {
  show: boolean;
}

const BookingConfirmation = ({ show }: BookingConfirmationProps) => {
  const booking = useContext(BookingContext);

  return (
    <>
      {show ? (
        <Wrapper>
          <h2>Tack för din bokning {booking.firstName}!</h2>
          <StyledP>
            Välkommen till oss {new Date(booking.date).toLocaleDateString()}, en
            bokningsbekräftelse har skickats till {booking.email}.
          </StyledP>
        </Wrapper>
      ) : null}
    </>
  );
};

export default BookingConfirmation;
