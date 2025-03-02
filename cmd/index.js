import express from 'express';
import userRoute from '../src/routes/userRoute.js';
import workspaceRoute from '../src/routes/workspaceRoute.js';

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan rute pengguna
app.use('/api', userRoute);
app.use('/api', workspaceRoute)

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
