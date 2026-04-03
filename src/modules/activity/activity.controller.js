const activityService = require("./activity.service");

exports.getTaskActivity = async (req, res) => {
  const logs = await activityService.getTaskActivity(req.params.taskId);
  res.json(logs);
};