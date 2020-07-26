const CustomError = require("../../domain/model/custom-error");
const Query = require("../../domain/model/query");

class ProjectResolver {
  constructor(router, projectRepository) {
    this.router = router;
    this.projectRepository = projectRepository;
  }

  resolve() {
    this.router.get("/project/:technology", this.getByTechnology.bind(this));
    this.router.post("/project", this.create.bind(this));
    this.router.put("/project", this.update.bind(this));
    this.router.delete("/project", this.delete.bind(this));
  }

  async getByTechnology(request, response) {
    const technology = new Query(request.params.technology).technology;
    try {
      const projects = await this.projectRepository.getByTechnology(technology);
      response.json(projects);
    } catch (error) {
      console.error(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async create(request, response) {}
  async update(request, response) {}
  async delete(request, response) {}
}

module.exports = ProjectResolver;
