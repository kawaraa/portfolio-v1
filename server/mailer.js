"use strict"
const nodemailer = require("nodemailer");

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
    service: 'gmail',
    auth: {
      user: 'ahma6d@gmail.com',
      pass: 'xgeansxbhhfyyifb'
    }
  });

  let mailOptions = {
    from: '"Portfolio Contact" <contact@kawaraa.com>', // sender address
    to: "info@kawaraa.com", // list of receivers
    subject: form.need, // Subject line
    html: contactInfo // html body
  };

  return transporter.sendMail(mailOptions);

}

module.exports = sendEmail;