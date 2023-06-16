import { ChangeEvent, FormEvent, useContext } from "react";
import { BookingDispatchContext } from "../contexts/BookingContext";
import { ActionType } from "../reducers/BookingReducer";
import { StyledP } from "./styled/StyledP";
import { Button } from "./styled/Buttons";

interface SittingFormProps {
  showTime: boolean;
  showDateForm: (showDate: boolean) => void;
  showCustomerForm: (showCustomer: boolean) => void;
}

const SittingForm = ({
  showTime,
  showDateForm,
  showCustomerForm,
}: SittingFormProps) => {
  const dispatch = useContext(BookingDispatchContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionType.SITTING, payload: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    showDateForm(false);
    showCustomerForm(true);
  };
  return (
    <div>
      {showTime ? (
        <form id="sittings" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="18">
              <StyledP>kl 18</StyledP>
            </label>
            <input
              type="radio"
              name="sitting"
              id="18"
              value={1}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="21">
              <StyledP>kl 21</StyledP>
            </label>
            <input
              type="radio"
              name="sitting"
              id="21"
              value={2}
              onChange={handleChange}
            />
          </div>
          <Button bgcolor="red" color="white" fontSize="0.9rem" type="submit">
            Välj
          </Button>
        </form>
      ) : null}
    </div>
  );
};

export default SittingForm;
