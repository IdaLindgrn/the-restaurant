const Booking = require("../models/Booking");

exports.getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findById(bookingId);
    if (!booking) throw new Error("This booking does not exist");
    return res.json({
      data: booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    console.log(bookings);
    return res.json({
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createNewBooking = async (req, res) => {
  try {
    const { numberOfPeople, sitting, email, date } = req.body;

    if (!numberOfPeople || !sitting || !email || !date) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const tableSize = 6;
    const tablesPerSitting = 15;

    const tablesNeeded = Math.ceil(numberOfPeople / tableSize);
    const occupiedTables = await Booking.countDocuments({ sitting, date });

    if (occupiedTables + tablesNeeded > tablesPerSitting) {
      return res.status(400).json({
        message: "No available tables for the selected sitting and date.",
      });
    }

    const newBooking = await Booking.create({
      table: 0,
      numberOfPeople,
      sitting,
      email,
      date,
    });

    return res.status(201).json(newBooking);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
