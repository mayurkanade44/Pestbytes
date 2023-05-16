export const notFound = (req, res, next) => {
  let error = new Error(`Not Found ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};
