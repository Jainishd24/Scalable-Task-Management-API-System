const jwt = require("jsonwebtoken");
const Company = require("../modules/company/company.model");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw { statusCode: 401, message: "Unauthorized" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    // Super admin bypasses company expiry check
    if (decoded.role === "super-admin") {
      return next();
    }

    // Fetch company
    const company = await Company.findById(decoded.companyId);

    if (!company) {
      throw { statusCode: 404, message: "Company not found" };
    }

    // Check if subscription expired
    if (company.planExpiry < new Date()) {
      throw {
        statusCode: 403,
        message: "Company subscription has expired"
      };
    }

    next();
  } catch (error) {
    next({
      statusCode: error.statusCode || 401,
      message: error.message || "Invalid or expired token"
    });
  }
};