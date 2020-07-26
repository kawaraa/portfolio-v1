const CustomError = require("../../domain/model/custom-error");
const CreateProjectCommand = require("../../domain/command/create-project-command");
const QueryProjectsCommand = require("../../domain/command/query-projects-command");
const UpdateProjectCommand = require("../../domain/command/update-project-command");
const DeleteProjectCommand = require("../../domain/command/delete-project-command");

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
    const technology = new QueryProjectsCommand(request.params.technology).technology;
    try {
      const projects = await this.projectRepository.getByTechnology(technology);
      response.json(projects);
    } catch (error) {
      console.error(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async create(request, response) {
    const command = new CreateProjectCommand(request.body);
    try {
      await this.projectRepository.create(command);
      response.json({ success: true });
    } catch (error) {
      console.error(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async update(request, response) {
    const command = new UpdateProjectCommand(request.body);
    console.log(command);
    try {
      await this.projectRepository.update(command);
      response.json({ success: true });
    } catch (error) {
      console.error(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
  async delete(request, response) {
    const command = new DeleteProjectCommand(request.body.id);
    try {
      await this.projectRepository.delete(command.id);
      response.json({ success: true });
    } catch (error) {
      console.error(error);
      response.status(500).end(CustomError.toJson(error));
    }
  }
}

module.exports = ProjectResolver;
