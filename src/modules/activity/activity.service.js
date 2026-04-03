const Activity = require("./activity.model");

exports.getTaskActivity = async (taskId) => {
  return await Activity.find({ task: taskId }).populate("changedBy");
};