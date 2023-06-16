import { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";
import { StyledP } from "./styled/StyledP";
import { Wrapper } from "./styled/Wrappers";
import { Button } from "./styled/Buttons";

interface CannotBookProps {
  show: boolean;
}

const CannotBook = ({ show }: CannotBookProps) => {
  const booking = useContext(BookingContext);
  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      {show ? (
        <Wrapper>
          <h2>Din bokning gick tyvärr inte igenom!</h2>
          <StyledP>
            Det fanns tyvärr inte tillräckligt många platser för din bokning!
          </StyledP>
          <StyledP>
            Du får gärna testa igen genom att trycka på knappen{" "}
            <Button
              bgcolor="red"
              color="white"
              fontSize="1rem"
              onClick={refresh}
            >
              Boka Igen
            </Button>
          </StyledP>
        </Wrapper>
      ) : null}
    </>
  );
};

export default CannotBook;
