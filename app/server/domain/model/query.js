class Query {
  constructor(technology) {
    this._technology = technology;
  }
  set _technology(value) {
    this.technology = (typeof value === "string") & (value.length < 12) && value !== "all" ? value : "";
  }
}

module.exports = Query;
