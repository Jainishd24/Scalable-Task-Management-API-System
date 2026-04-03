exports.success = (res, data, message = "Success") => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

exports.error = (res, message = "Error") => {
  return res.status(400).json({
    success: false,
    message,
  });
};