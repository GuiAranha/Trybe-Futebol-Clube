import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  const { code, message } = err;
  if (!code) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(code).json({ message });
};

export default errorMiddleware;
