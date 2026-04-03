const User = require("../user/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerSuperAdmin = async (data) => {
  const existingSuperAdmin = await User.findOne({ role: "super-admin" });

  if (existingSuperAdmin) {
    throw { statusCode: 400, message: "Super Admin already exists" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: "super-admin",
    company: null
  });

  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw { statusCode: 400, message: "Invalid email or password" };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { statusCode: 400, message: "Invalid email or password" };
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
      companyId: user.company
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};