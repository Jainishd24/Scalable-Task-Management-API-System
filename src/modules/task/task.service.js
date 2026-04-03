const Task = require("./task.model");
const Activity = require("../activity/activity.model");
const { generateTaskId } = require("../../utils/taskIdGenerator");

// CREATE TASK (Admin only)
exports.createTask = async (data, user) => {
  if (user.role !== "admin") {
    throw new Error("Only admin can create tasks");
  }

  const taskId = await generateTaskId(data.projectCode);

  const task = await Task.create({
    ...data,
    taskId,
    createdBy: user.id,
  });

  return task;
};

// GET TASKS
exports.getTasks = async (user) => {
  let filter = {};

  if (user.role === "user") {
    filter.assignedTo = user.id;
  }

  return await Task.find(filter).populate("assignedTo");
};

// UPDATE TASK
exports.updateTask = async (taskId, data, user) => {
  const task = await Task.findById(taskId);

  if (!task) throw new Error("Task not found");

  let oldStatus = task.status;

  // USER → only status
  if (user.role === "user") {
    if (!data.status) throw new Error("Only status can be updated");
    task.status = data.status;
  }

  // ADMIN → full update
  if (user.role === "admin") {
    Object.assign(task, data);
  }

  await task.save();

  // 🔥 Activity Tracking
  if (data.status && oldStatus !== data.status) {
    await Activity.create({
      task: task._id,
      changedBy: user.id,
      fromStatus: oldStatus,
      toStatus: data.status,
    });
  }

  return task;
};

// DELETE TASK (Admin only)
exports.deleteTask = async (taskId, user) => {
  if (user.role !== "admin") {
    throw new Error("Only admin can delete tasks");
  }

  await Task.findByIdAndDelete(taskId);
};