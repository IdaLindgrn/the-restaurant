const express = require("express");
const router = express.Router();
const { createEmail } = require("../controllers/mailControllers");

router.post("/", createEmail);

module.exports = router;
