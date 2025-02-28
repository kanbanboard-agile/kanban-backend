import { Sequelize } from 'sequelize';
import config from './databaseConfig.js';

// Tentukan lingkungan (default: development)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Inisialisasi instance Sequelize
const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
});

export default sequelize;
