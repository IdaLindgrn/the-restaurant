import { IBooking } from "../models/IBooking";


export enum ActionType {
  FIRSTNAME,
  LASTNAME,
  EMAIL,
  PHONENUMBER,
  SITTING,
  NUMBEROFPEOPLE,
  DATE,
  GOTBOOKINGID,
  ACTUALNUMBEROFGUESTS,
}

export interface IAction {
  type: ActionType;
  payload: any;
}

const BookingReducer = (booking: IBooking, action: IAction): IBooking => {
  switch (action.type) {
    case ActionType.NUMBEROFPEOPLE: {
      return { ...booking, numberOfPeople: action.payload };
    }

    case ActionType.SITTING: {
      return { ...booking, sitting: action.payload };
    }

    case ActionType.ACTUALNUMBEROFGUESTS: {
      return { ...booking, actualNumberOfGuests: action.payload };
    }

    case ActionType.DATE: {
      return { ...booking, date: action.payload };
    }

    case ActionType.FIRSTNAME: {
      return { ...booking, firstName: action.payload };
    }

    case ActionType.LASTNAME: {
      return { ...booking, lastName: action.payload };
    }

    case ActionType.EMAIL: {
      return { ...booking, email: action.payload };
    }

    case ActionType.PHONENUMBER: {
      return { ...booking, phoneNumber: action.payload };
    }

    case ActionType.GOTBOOKINGID: {
      return { ...booking, _id: action.payload };
    }

    default: {
      return booking;
    }
  }
};

export default BookingReducer;
