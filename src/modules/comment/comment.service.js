const Comment = require("./comment.model");

exports.addComment = async (data, user) => {
  return await Comment.create({
    task: data.taskId,
    user: user.id,
    message: data.message,
  });
};

exports.getComments = async (taskId) => {
  return await Comment.find({ task: taskId }).populate("user");
};

exports.deleteComment = async (id, user) => {
  const comment = await Comment.findById(id);

  if (!comment) throw new Error("Comment not found");

  if (comment.user.toString() !== user.id && user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await Comment.findByIdAndDelete(id);
};