const Task = require("../modules/task/task.model");

exports.generateTaskId = async (projectCode) => {
  const count = await Task.countDocuments({ projectCode });
  const next = count + 1;

  return `${projectCode}-${String(next).padStart(2, "0")}`;
};