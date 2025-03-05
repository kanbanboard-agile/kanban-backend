import express from 'express';
import userRoute from '../src/routes/userRoute.js';
import workspaceRoute from '../src/routes/workspaceRoute.js';
import taskRoute from '../src/routes/taskRoute.js';
import notificationRoute from '../src/routes/notificationRoute.js';

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan rute pengguna
app.use('/api', userRoute);
app.use('/api', workspaceRoute);
app.use('/api', taskRoute);
app.use('/api', notificationRoute);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
