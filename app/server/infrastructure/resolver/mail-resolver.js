const Sender = require("../../domain/model/sender");
const cnf = { service: "gmail", auth: { user: "ahma6d@gmail.com", pass: "rsbaoszwbvlxtccg" } };

class MailResolver {
  constructor(router, mailer, config) {
    this.router = router;
    this.transporter = mailer.createTransport(config);
    this.mailOptions = {
      from: '"Portfolio Contact" <contact@kawaraa.com>', // sender address
      to: "info@kawaraa.com", // list of receivers
      subject: "", // Subject line
      html: "", // html body
    };
  }
  resolve() {
    this.router.post("/contact", this.send.bind(this));
  }

  async send(request, response) {
    const sender = new Sender(request.body);
    this.mailOptions.html = this.getHtmlTemplate(sender);
    this.mailOptions.subject = sender.need;

    this.transporter.sendMail(this.mailOptions, (error, info) => {
      if (error) response.status(500).end(error.message);
      console.error("Message sent: " + info.messageId);
      response.json({ success: true });
    });
  }

  getHtmlTemplate(sender) {
    const contactInfo = `
      <h2>A new contact request</h2>
      <h3>Contact details</h3>
      <ul>
      <li>Name: ${sender.name}</li>
      <li>Email: ${sender.email}</li>
      <li>Organization: ${sender.organization}</li>
      <li>Need: ${sender.need}</li>
      <li>Budget: ${sender.budget}</li>
      <li>Deadline: ${sender.deadline}</li>
      <h4>Message:</h4>
      <p>${sender.message}</p>
      </ul>
    `;
    return contactInfo;
  }
}

module.exports = MailResolver;
