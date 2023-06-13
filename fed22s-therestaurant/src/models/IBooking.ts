export interface IBooking {
  numberOfPeople: number;
  sitting: number;
  date: Date // Update the type to Date | null
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  _id: string;
};

export const defaultBooking: IBooking = {
  _id: "",
  numberOfPeople: 1,
  sitting: 1,
  date: new Date(),
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};
