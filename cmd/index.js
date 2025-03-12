import express from 'express';
import userRoute from '../src/routes/userRoute.js';
import workspaceRoute from '../src/routes/workspaceRoute.js';
import taskRoute from '../src/routes/taskRoute.js';
import notificationRoute from '../src/routes/notificationRoute.js';
import task_attachmentsRoute from '../src/routes/task_attachmentsRoute.js';

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Routes dengan prefix unik
app.use('/api/public', userRoute);
app.use('/api/workspaces', workspaceRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/notifications', notificationRoute);
app.use('/api/task-attachments', task_attachmentsRoute);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
