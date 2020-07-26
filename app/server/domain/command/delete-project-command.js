class DeleteProjectCommand {
  constructor(id) {
    this._id = id;
  }
  set _id(value) {
    const val = Number.parseFloat(value);
    this.id = typeof value === "string" || !Number.isNaN(val) ? value : "";
  }
}

module.exports = DeleteProjectCommand;
