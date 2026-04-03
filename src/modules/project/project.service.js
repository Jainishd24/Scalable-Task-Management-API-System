const Project = require("./project.model");
const Company = require("../company/company.model");

// 🔹 Create Project with Plan + Expiry + Limit Validation
exports.createProject = async (data) => {

  // 1. Get company with plan
  const company = await Company.findById(data.company_id).populate("subscriptionPlan");

  if (!company) {
    throw new Error("Company not found");
  }

  // 2. Check company active
  if (company.status !== "active") {
    throw new Error("Company is not active");
  }

  // 🔥 3. Check plan expiry
  if (new Date() > company.planExpiry) {
    throw new Error("Your subscription plan has expired");
  }

  // 4. Count existing projects (company-based)
  const projectCount = await Project.countDocuments({
    company_id: data.company_id,
  });

  // 5. Check plan limit
  const projectLimit = company.subscriptionPlan?.project_limit;

  if (projectLimit && projectCount >= projectLimit) {
    throw new Error("Project limit reached for your plan");
  }

  // 6. Create project
  const project = await Project.create(data);

  return project;
};

// 🔹 Get Projects with Pagination + Filtering
exports.getProjects = async ({ page, limit, company_id }) => {

  const skip = (page - 1) * limit;

  const filter = {
    isActive: true, // 🔥 ONLY ACTIVE PROJECTS
  };

  // 🔥 Multi-tenant safety
  if (company_id) {
    filter.company_id = company_id;
  }

  const projects = await Project.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Project.countDocuments(filter);

  return {
    total,
    page,
    limit,
    projects,
  };
};

exports.deleteProject = async (project_id, company_id) => {

  const project = await Project.findOne({
    _id: project_id,
    company_id,
    isActive: true,
  });

  if (!project) {
    throw new Error("Project not found");
  }

  return await Project.findByIdAndUpdate(project_id, {
    isActive: false, // 🔥 SOFT DELETE
  });
};

exports.getUserProjects = async (user_id) => {
  return await Project.find({
    users: user_id,
  });
};