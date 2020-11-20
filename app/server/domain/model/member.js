const CustomError = require("./custom-error");

class Member {
  constructor(info) {
    this._email = info.email;
    this._password = info.password;
  }
  set _email(value) {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w[a-zA-Z]{2,5})+$/.test(value);
    if (isEmail) return (this.email = value);
    throw new CustomError("Invalid input email");
  }
  set _password(value) {
    if (!env || value !== env.PIN) throw new CustomError("Invalid input password");
    this.password = value;
  }
}

module.exports = Member;
