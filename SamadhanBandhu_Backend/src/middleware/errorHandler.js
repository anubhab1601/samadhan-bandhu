export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Validation errors
  if (err.status === 400) {
    return res.status(400).json({
      success: false,
      message: err.message || 'Validation error',
      errors: err.errors
    });
  }

  // Not found
  if (err.status === 404) {
    return res.status(404).json({
      success: false,
      message: 'Resource not found'
    });
  }

  // Unauthorized
  if (err.status === 401) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
};
