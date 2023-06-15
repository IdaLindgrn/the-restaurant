import axios from "axios";

export async function createEmail(
  email: string,
  firstName: string,
  date: string,
  _id: string
) {
  try {
    console.log(_id);

    const response = await axios.post("http://localhost:4000/api/v1/send", {
      email,
      firstName,
      date,
      _id,
    });
    console.log(response.data);
    console.log("Email sent");
    return response.data;
  } catch (error) {
    console.log("Error sending Email:", error);
    throw error;
  }
}
