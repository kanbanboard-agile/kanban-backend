import dotenv from 'dotenv';

// Memuat variabel lingkungan dari file .env
dotenv.config();

// Membuat connection string untuk PostgreSQL
const dbUrl = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Mengekspor konfigurasi untuk Sequelize CLI
export default {
  development: {
    url: dbUrl,
    dialect: 'postgres',
    logging: false,
  },
  // Opsional: Tambahkan konfigurasi untuk lingkungan lain jika diperlukan
  test: {
    url: dbUrl, // Ganti dengan URL spesifik untuk test jika berbeda
    dialect: 'postgres',
    logging: false,
  },
  production: {
    url: dbUrl, // Ganti dengan URL spesifik untuk production jika berbeda
    dialect: 'postgres',
    logging: false,
  },
};
