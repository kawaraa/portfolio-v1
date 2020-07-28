const CustomError = require("./custom-error");

class Sender {
  constructor(info) {
    this._name = info.name;
    this._email = info.email;
    this._organization = info.organization;
    this._need = info.need;
    this._budget = info.budget;
    this._deadline = info.deadline;
    this._message = info.message;
  }
  set _name(value) {
    if (typeof value === "string" && value.length <= 35) return (this.name = value);
    throw new CustomError("Invalid input name");
  }
  set _email(value) {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w[a-zA-Z]{2,5})+$/.test(value);
    if (isEmail) return (this.email = value);
    throw new CustomError("Invalid input email");
  }
  set _organization(value) {
    if (typeof value === "string" && value.length <= 35) return (this.organization = value);
    throw new CustomError("Invalid input organization");
  }
  set _need(value) {
    if (typeof value === "string" && value.length <= 20) return (this.need = value);
    throw new CustomError("Invalid input need");
  }
  set _budget(value) {
    const val = Number.parseInt(value);
    if (val <= 10000) return (this.budget = value);
    throw new CustomError("Invalid input budget");
  }
  set _deadline(value) {
    const val = Number.parseInt(value);
    if (val <= 365) return (this.deadline = value);
    throw new CustomError("Invalid input deadline");
  }
  set _message(value) {
    if (typeof value === "string") return (this.message = value);
    throw new CustomError("Invalid input message");
  }
}

module.exports = Sender;
