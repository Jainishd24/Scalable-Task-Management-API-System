const taskService = require("./task.service");

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user);
    res.json(task);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.getTasks = async (req, res) => {
  const tasks = await taskService.getTasks(req.user);
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user
    );
    res.json(task);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};