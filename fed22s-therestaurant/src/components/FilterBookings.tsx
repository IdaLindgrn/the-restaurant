import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IBooking } from "../models/IBooking";
import bookingFromLS from "../utils/getLS";

interface FilterBookingsProps {
  bookings: IBooking[];
  set: (bookings: IBooking[]) => void;
}

const FilterBookings = ({ bookings, set }: FilterBookingsProps) => {
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    set(bookings);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value.toLowerCase());
    const filteredList = bookings.filter((booking) => {
      return (
        new Date(booking.date).toLocaleDateString().includes(searchWord) ||
        booking.email.toLowerCase().includes(searchWord) ||
        booking.firstName.toLowerCase().includes(searchWord) ||
        booking.lastName.toLowerCase().includes(searchWord) ||
        booking.phoneNumber.includes(searchWord)
      );
    });
    if (searchWord.length <= 1) {
      set(bookingFromLS);
    } else {
      set(filteredList);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={searchWord}
          onChange={handleChange}
          placeholder="Sök bokning"
          style={{ padding: "0.5rem" }}
        />
      </form>
    </div>
  );
};

export default FilterBookings;
