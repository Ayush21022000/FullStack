import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db'; // Sequelize config
import authRoutes from './routes/auth.routes';
import cors from 'cors';
dotenv.config();
import Products from '../src/models/products';

import User from '../src/models/user';

const models = [User, Products];

import productRoutes from './routes/products.routes';

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200', // Allow requests from the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true, // Allow cookies and authorization headers
  })
);
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes );
// Sync database and start server
const startServer = async () => {
  try {
    // Synchronize models with the database (create tables if they don't exist)
    await sequelize.sync({ force: true }); // Set to `true` to drop tables and re-create them
    console.log('Database synced');

    // Start the server
    app.listen(4000, () => {
      console.log('Server running on http://localhost:4000');
    });
  } catch (error) {
    console.error('Error syncing database', error);
  }
};

startServer();


