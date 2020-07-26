class ProjectRepository {
  constructor(mySqlProvider, config) {
    this.mySqlProvider = mySqlProvider;
    this.config = config;
  }

  async getByTechnology(technology) {
    let query = `SELECT * FROM portfolio.project WHERE technology LIKE '%${technology}%'`;
    const result = await this.mySqlProvider.query(query);
    return result;
  }
  async create(account) {}
  async update(account) {}
  async delete(account) {}
}

module.exports = ProjectRepository;
