const companyService = require("./company.service");
const { successResponse } = require("../../utils/response");
const {
  createCompanySchema,
  updateCompanySchema
} = require("./company.validation");

exports.createCompany = async (req, res, next) => {
  try {
    const { error } = createCompanySchema.validate(req.body);
    if (error) throw { statusCode: 400, message: error.details[0].message };

    const company = await companyService.createCompany(req.body);

    return successResponse(res, 201, "Company created successfully", company);
  } catch (err) {
    next(err);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const { error } = updateCompanySchema.validate(req.body);
    if (error) throw { statusCode: 400, message: error.details[0].message };

    const company = await companyService.updateCompany(req.params.id, req.body);

    return successResponse(res, 200, "Company updated successfully", company);
  } catch (err) {
    next(err);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    await companyService.deleteCompany(req.params.id);

    return successResponse(res, 200, "Company deleted successfully");
  } catch (err) {
    next(err);
  }
};

exports.listCompanies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { companies, total } = await companyService.listCompanies(page, limit);

    return successResponse(res, 200, "Companies fetched successfully", companies, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};