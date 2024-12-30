import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Create a Sequelize instance
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: '127.0.0.1',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  logging: false, // Enable if you want to debug SQL queries
});

const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Use { force: true } only during development
    console.log('Database synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

export default sequelize;
