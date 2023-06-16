export interface IBooking {
  table: [];
  numberOfPeople: number;
  actualNumberOfGuests: number; // Add a new property to store the actual number of guests
  sitting: number;
  date: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  _id: string;
}

export const defaultBooking: IBooking = {
  table: [],
  _id: "",
  numberOfPeople: 1,
  actualNumberOfGuests: 1, // Set the initial value to 1
  sitting: 1,
  date: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};
