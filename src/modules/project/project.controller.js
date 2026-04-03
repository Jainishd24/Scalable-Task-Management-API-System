const service = require("./project.service");
const { success } = require("../../utils/response");
const { createProjectSchema } = require("../../validations/project.validation");

exports.createProject = async (req, res, next) => {
  try {
    
     // 🔥 JOI VALIDATION
    const { error } = createProjectSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const data = {
      ...req.body,
      company_id: req.user.company_id,
      created_by: req.user.id,
    };

    const project = await service.createProject(data);

    return success(res, project);
  } catch (e) {
    next(e);
  }
};
exports.getProjects = async (req, res, next) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    // 🔥 IMPORTANT: scope to company
    const company_id = req.user.company_id;

    const data = await service.getProjects({
      page,
      limit,
      company_id,
    });

    return success(res, data);
  } catch (e) {
    next(e);
  }
};

exports.getUserProjects = async (req, res, next) => {
  try {
    const data = await service.getUserProjects(req.user.id);
    return success(res, data);
  } catch (e) {
    next(e);
  }
};