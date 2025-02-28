import express from 'express';
import userRoute from '../src/routes/userRoute.js';

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan rute pengguna
app.use('/api', userRoute);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
