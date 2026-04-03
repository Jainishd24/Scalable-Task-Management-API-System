const commentService = require("./comment.service");

exports.addComment = async (req, res) => {
  const comment = await commentService.addComment(req.body, req.user);
  res.json(comment);
};

exports.getComments = async (req, res) => {
  const comments = await commentService.getComments(req.params.taskId);
  res.json(comments);
};

exports.deleteComment = async (req, res) => {
  try {
    await commentService.deleteComment(req.params.id, req.user);
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};