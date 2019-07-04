"use strict";
<<<<<<< HEAD
// Add to projects: https://class17hackyourestate.herokuapp.com/
=======
// Add to projects:
>>>>>>> docker

// const path = require("path");
// const root = path.join(__dirname, "../");
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use("/public", express.static(__dirname + "/public/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/contact", (req, res) => {
  sendEmail(req.body);
  res.send("Thanks for contacting me!<br />I will contact you back very soon.");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, err => {
  let state = err ? err.message : `App running on http://localhost:${PORT}`;
  console.log(state);
});

function sendEmail(form) {
  const contactInfo = `
  <h2>A new contact request</h2>
  <h3>Contact details</h3>
  <ul>
  <li>Name: ${form.name}</li>
  <li>Email: ${form.email}</li>
  <li>Organization: ${form.organization}</li>
  <li>Need: ${form.need}</li>
  <li>Budget: ${form.budget}</li>
  <li>Deadline: ${form.deadline}</li>
  <h4>Message:</h4>
  <p>${form.message}</p>
  </ul>
  `;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahma6d@gmail.com",
      pass: "xgeansxbhhfyyifb"
    }
  });

  let mailOptions = {
    from: '"Portfolio Contact" <contact@kawaraa.com>', // sender address
    to: "info@kawaraa.com", // list of receivers
    subject: form.need, // Subject line
    html: contactInfo // html body
  };

  transporter.sendMail(mailOptions, (err, info) => {
    let result = err ? err : "Message sent: " + info.messageId;
    console.error(result);
  });
}
