export const errorResponseHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  res
    .status(statusCode)
    .json({
      msg: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

export const invalidRoute = (req, res, next) => {
  let error = new Error("Invalid Route");
  error.statusCode = 404;
  next(error);
};
