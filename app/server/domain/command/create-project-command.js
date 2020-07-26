class CreateProjectCommand {
  constructor(project) {
    this._title = project.title;
    this._link = project.link;
    this._technology = project.technology;
  }
  set _title(value) {
    this.title = typeof value === "string" && value.length < 40 ? value : "No title";
  }
  set _link(value) {
    this.link = typeof value === "string" ? value : "";
  }
  set _technology(value) {
    this.technology = typeof value === "string" && value.length < 12 && value !== "all" ? value : "";
  }
}

module.exports = CreateProjectCommand;
