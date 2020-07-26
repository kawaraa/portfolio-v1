class UpdateProjectCommand {
  constructor(project) {
    this.id = project.id;
    this.setTitle(project.title);
    this.setLink(project.link);
    this.setTechnology(project.technology);
    this.setStarsRate(project.starsRate);
    this.setViews(project.views);
  }
  setTitle(value) {
    if (typeof value === "string" && value.length < 40) this.title = value;
  }
  setLink(value) {
    if (typeof value === "string") this.link = value;
  }
  setTechnology(value) {
    if (typeof value === "string") this.technology = value;
  }
  setStarsRate(value) {
    const val = Number.parseFloat(value);
    if (!Number.isNaN(val) && val <= 5) this.starsRate = val;
  }
  setViews(value) {
    const val = Number.parseFloat(value);
    if (!Number.isNaN(val)) this.views = val;
  }
}

module.exports = UpdateProjectCommand;
