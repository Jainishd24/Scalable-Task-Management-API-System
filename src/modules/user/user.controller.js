const userService = require("./user.service");
const { successResponse } = require("../../utils/response");
const { createUserSchema } = require("../../validations/user.validation");
const userController = require("./user.controller");


// 🔥 Create User (Admin Only)
exports.createUser = async (req, res, next) => {
  try {
    const { error } = createUserSchema.validate(req.body);
    if (error) {
      throw { statusCode: 400, message: error.details[0].message };
    }

    // 🔥 FORCE company_id from logged-in admin
    const data = {
      ...req.body,
      company_id: req.user.company_id,
    };

    const user = await userService.createUser(data);

    return successResponse(res, 201, "User created successfully", user);

  } catch (err) {
    next(err);
  }
};


// 🔥 List Users (Company Scoped)
exports.listUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // 🔥 FIX: correct field name
    const { users, total } = await userService.listUsers(
      req.user.company_id,
      page,
      limit
    );

    return successResponse(res, 200, "Users fetched", users, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });

  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // your delete logic
    res.json({ msg: "User deleted successfully" });

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};