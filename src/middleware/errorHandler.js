export const errorHandler = (err, req, res, next) => {
  console.log('errorMiddleware', err);
  const isProd = process.env.NODE_ENV === 'production';

  res
    .status(500)
    .json({ message: isProd ? 'Please, try again later' : err.message });
};
