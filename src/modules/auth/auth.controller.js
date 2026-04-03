const authService = require("./auth.service");
const { successResponse } = require("../../utils/response");

exports.registerSuperAdmin = async (req, res, next) => {
  try {
    await authService.registerSuperAdmin(req.body);
    return successResponse(res, 201, "Super Admin created successfully");
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    return successResponse(res, 200, "Login successful", data);
  } catch (error) {
    next(error);
  }
};