const sendEmail = require("../utils/sendEmail");

exports.createEmail = async (req, res) => {
  const { email, firstName, date, _id } = req.body;

  try {
    console.log("HEJ" + firstName, date, _id);
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const subject = "Bokningsbekräftelse WAIO Restaurang";
    const message = `
    <h3>Hej ${firstName}!</h3>
    <p>Tack för din bokning hos oss på <b>WAIO</b> ${date}. </br>
    För att ändra din bokning tryck <a href="http://localhost:5173/admin/${_id}">här</a></p>
    __________________________
    
    <h4>Allt gott, WAIO!</h4>

    __________________________

    <h5>WAIO</h5>
              <p>Vägen 12</p>
              <p>123 45 Sthlm</p>
              <p>Tel. 123-456 78 90</p>
              <p>info@awo.se</p>

    `;

    await sendEmail(send_to, sent_from, subject, message);
    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
