const Company = require("./company.model");
const Plan = require("../plan/plan.model");

exports.createCompany = async (data) => {
  const plan = await Plan.findById(data.subscriptionPlan);

  if (!plan) {
    throw { statusCode: 404, message: "Plan not found" };
  }

  // Calculate expiry date based on plan duration
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + plan.duration);

  const company = await Company.create({
    name: data.name,
    subscriptionPlan: plan._id,
    planExpiry: expiryDate
  });

  return company;
};

exports.updateCompany = async (id, data) => {
  const company = await Company.findByIdAndUpdate(id, data, { new: true });

  if (!company) {
    throw { statusCode: 404, message: "Company not found" };
  }

  return company;
};

exports.deleteCompany = async (id) => {
  const company = await Company.findByIdAndDelete(id);

  if (!company) {
    throw { statusCode: 404, message: "Company not found" };
  }

  return company;
};

exports.listCompanies = async (page, limit) => {
  const skip = (page - 1) * limit;

  const companies = await Company.find()
    .skip(skip)
    .limit(limit);

  const total = await Company.countDocuments();

  return {
    companies,
    total
  };
};