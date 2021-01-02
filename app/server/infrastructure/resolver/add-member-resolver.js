const Member = require("../../domain/model/member");

class AddMemberResolver {
  constructor(router, mailer) {
    this.router = router;
    this.transporter = mailer.createTransport(env.NODEMAILER);
    this.error = "<h1>Something went wrong, please try again later!</h1>";
    this.mailOptions = {
      from: '"Kawara" <contact@kawaraa.com>', // sender address
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
    return `
      <h2>عزيزي المستخدم, تمت عملية الشراء بنجاح, ستجد رابط الكتاب في هاذ البريد</h2>
      <p>Google Drive الكتاب يفتح على جميع الاجهزة, لان ملف الكتاب موجود على منصة</p>
      <h3>:طريقة الاستخدام</h3>
      <ol>
      <li>لتستفيد من عملية البحث في الكتاب <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.docs">Google Docs</a> اذا كنت تستخدم جهاز الموبايل, يمكنك تحميل برامج</li>
      <li><h4>
      <a href="https://docs.google.com/document/d/1J7n5Oy3yNom3wf8FM3E_Wm6pUD9IVIh_n4sXACV7X_M/edit?usp=sharing">اضغط هنا للذهاب الى الكتاب</a>
      <a href="https://youtube.com/playlist?list=PL7eo2mdxPTbp8I5ns4sBoV0Kp2AL5mSbX">اضغط هنا للذهاب الى قائمة الفيديوهات</a>
      </h4></li>
      </ol>
    `;
  }
}

module.exports = AddMemberResolver;
