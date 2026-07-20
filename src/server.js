import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import productsRoutes from './routes/productsRoutes.js';
import authRotes from './routes/authRoutes.js';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(productsRoutes);
app.use(authRotes);

app.use(notFoundHandler);

app.use(errorHandler);

await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
