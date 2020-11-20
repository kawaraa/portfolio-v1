const Member = require("../../domain/model/member");

class AddMemberResolver {
  constructor(router, mailer) {
    this.router = router;
    this.transporter = mailer.createTransport(env.NODEMAILER);
    this.error = "<h1>Something went wrong, please try again later!</h1>";
    this.mailOptions = {
      from: '"Portfolio Contact" <armandoshamo@gmail.com>', // sender address
      to: "", // list of receivers
      subject: "تاكيد عملية الشراء", // Subject line
      html: "", // html body
    };
  }
  resolve() {
    this.router.post("/add-member", this.send.bind(this));
  }

  async send(request, response) {
    this.mailOptions.to = new Member(request.body).email;
    this.mailOptions.html = this.getHtmlTemplate();

    this.transporter.sendMail(this.mailOptions, (error, info) => {
      if (error) response.status(500).end(this.error);
      console.error("Message sent: " + info.messageId);
      response.redirect("/add-member.html");
    });
  }

  getHtmlTemplate() {
    const contactInfo = `
      <h2>عزيزي المستخدم, تمت عملية الشراء بنجاح, ستجد رابط الكتاب في هاذ البريد</h2>
      <p><a href="https://google.com">اضغط هنا للذهاب الى الكتاب</a> :رابط الكتاب</p>
      <p>Google Drive الجهاز يفتح على اي جهاز, لا الملف موجود على منصة</p>
      <h4>:طريقة الاستخدام</h4>
      <ol>
      <li>.تاكد انك مسجل دخول الى حسابك جوجل من نفس الايميل الذي استخدمته عند الدفع</li>
      <li>اذا كنت تستخدم جهاز بنظام اندرويد</li>
      <li>اذا كنت تستخدم جهاز بنظام ايفون</li>
      <li>اذا كنت تستخدم جهاز الكمبيوتر</li>
      </ol>
    `;
    return contactInfo;
  }
}

module.exports = AddMemberResolver;
