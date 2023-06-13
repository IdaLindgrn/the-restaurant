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

exports.getAllBookingsByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    let query = {
      date: { $gte: startDate, $lt: endDate },
    };

    if (req.query.sitting) {
      query.sitting = req.query.sitting;
    }

    const bookings = await Booking.find(query);

    if (bookings.length === 0) {
      return res.status(404).json({
        message: "No bookings found for the specified date and sitting.",
      });
    }

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
    const {
      numberOfPeople,
      sitting,
      firstName,
      lastName,
      email,
      phoneNumber,
      date,
    } = req.body;

    if (
      !numberOfPeople ||
      !sitting ||
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !date
    ) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const newBooking = await Booking.create({
      numberOfPeople,
      sitting,
      firstName,
      lastName,
      email,
      phoneNumber,
      date: date,
    });    

    return res.status(201).json(newBooking);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const { numberOfPeople, sitting, email, phoneNumber, date } =
      req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    booking.numberOfPeople = numberOfPeople || booking.numberOfPeople;
    booking.sitting = sitting || booking.sitting;
    booking.email = email || booking.email;
    booking.phoneNumber = phoneNumber || booking.phoneNumber;
    booking.date = date || booking.date;

    // Update the booking
    await booking.save();

    return res.status(200).json({
      message: "Booking updated successfully.",
      data: booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};