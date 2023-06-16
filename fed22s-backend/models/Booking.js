const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  numberOfPeople: {
    type: Number,
  },
  actualNumberOfGuests: {
    type: Number,
  },
  sitting: {
    type: Number,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
