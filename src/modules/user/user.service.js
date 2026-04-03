const User = require("./user.model");
const bcrypt = require("bcryptjs");
const Company = require("../company/company.model");
const { sendMail } = require("../../utils/mailer");

// 🔥 Create User (Admin Only)
exports.createUser = async (data) => {

  const existing = await User.findOne({ email: data.email });
  if (existing) {
    throw { statusCode: 400, message: "Email already exists" };
  }

  // 🔥 Get company with plan
  const company = await Company.findById(data.company_id).populate("subscriptionPlan");

  if (!company) {
    throw { statusCode: 404, message: "Company not found" };
  }

  // 🔥 Check company active
  if (company.status !== "active") {
    throw { statusCode: 403, message: "Company is not active" };
  }

  // 🔥 Check plan expiry
  if (new Date() > company.planExpiry) {
    throw { statusCode: 403, message: "Subscription expired" };
  }

  // 🔥 Count active users only
  const userCount = await User.countDocuments({
    company_id: data.company_id,
    isActive: true,
  });

  const limit = company.subscriptionPlan?.user_limit;

  if (limit && userCount >= limit) {
    throw {
      statusCode: 403,
      message: "User limit reached for your plan"
    };
  }

  // 🔥 Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  // 🔥 Send welcome email
  await sendMail(
    data.email,
    "Welcome to Task Manager",
    `Your login credentials:
Email: ${data.email}
Password: ${data.password}`
  );

  return await User.findById(user._id).select("-password");
};


// 🔥 List Users (Company Scoped + Pagination)
exports.listUsers = async (company_id, page, limit) => {

  const skip = (page - 1) * limit;

  const filter = {
    company_id,
    isActive: true,
  };

  const users = await User.find(filter)
    .select("-password")
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  return { users, total };
};


// 🔥 Soft Delete User
exports.deleteUser = async (user_id, company_id) => {

  const user = await User.findOne({
    _id: user_id,
    company_id,
    isActive: true,
  });

  if (!user) {
    throw { statusCode: 404, message: "User not found" };
  }

  return await User.findByIdAndUpdate(user_id, {
    isActive: false,
  });
};