import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  console.log('errorMiddleware', err);

  const isProd = process.env.NODE_ENV === 'production';

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  res
    .status(500)
    .json({ message: isProd ? 'Please, try again later' : err.message });
};
