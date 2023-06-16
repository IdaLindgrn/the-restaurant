const express = require("express");
const router = express.Router();
const {
  getBookingById,
  getAllBookings,
  createNewBooking,
  deleteBookingById,
  updateBookingById,
  getAllBookingsByDate,
} = require("../controllers/bookingController");

router.get("/:bookingId", getBookingById);
router.get("/", getAllBookings);
router.get("/date/:date", getAllBookingsByDate);
router.post("/", createNewBooking);
router.delete("/:bookingId", deleteBookingById);
router.put("/:bookingId", updateBookingById);

module.exports = router;
