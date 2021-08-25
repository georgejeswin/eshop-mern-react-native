function errorHandler(err, req, res, next) {
  if ((err.name = "UnauthorizedError")) {
    return res.status(401).json({
      error: err,
    });
  }
  if (err.name === "ValidationError") {
    return res.status(401).json({
      error: err,
    });
  }

  return res.status(500).json(err);
}

export default errorHandler;
