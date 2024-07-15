import express, { NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route';
import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL || '';

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  route
app.use('/api/users', userRoutes);

// Error handler middleware
app.use(errorHandler);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });
