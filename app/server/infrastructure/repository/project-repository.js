class ProjectRepository {
  constructor(mySqlProvider) {
    this.mySqlProvider = mySqlProvider;
    this.config = env.projectRepository;
  }

  async getByTechnology(technology) {
    let query = `SELECT * FROM portfolio.project WHERE technology LIKE '%${technology}%'`;
    const result = await this.mySqlProvider.query(query);
    return result;
  }
  async create({ title, link, technology } = project) {
    const query = `INSERT INTO portfolio.project VALUES(0, ?, ?, ?, 0, 0)`;
    return this.mySqlProvider.query(query, [title, link, technology]);
  }
  async update(project, fields = "", values = []) {
    for (let key in project) {
      if (key !== "id") {
        fields += `${key}=?,`;
        values.push(project[key]);
      }
    }
    values.push(project.id);
    const query = `UPDATE portfolio.project SET ${fields.slice(0, -1)} WHERE id=?`;
    return this.mySqlProvider.query(query, values);
  }
  async delete(id) {
    const query = `DELETE FROM portfolio.project WHERE id=?`;
    return this.mySqlProvider.query(query, id);
  }
}

module.exports = ProjectRepository;
