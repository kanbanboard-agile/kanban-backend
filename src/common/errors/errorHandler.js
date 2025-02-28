import { STATUS_CODES } from '../../constants/statuscodeConstants.js';
import { ERROR_MESSAGES } from '../../constants/errorConstants.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = err.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({ error: message });
};
