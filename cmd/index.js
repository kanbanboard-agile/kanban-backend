import express from "express";
import userRoute from "../src/routes/userRoute.js";
import workspaceRoute from "../src/routes/workspaceRoute.js";
import taskRoute from "../src/routes/taskRoute.js";
import notificationRoute from "../src/routes/notificationRoute.js";
import task_attachmentsRoute from "../src/routes/task_attachmentsRoute.js";
import uploadRoute from "../src/routes/uploadRoutes.js";

const app = express();
const PORT = 3000;

// Buat server HTTP untuk Socket.IO
const server = http.createServer(app);

// Inisialisasi Socket.IO
initSocket(server);

// Middleware JSON
app.use(express.json());

// Menggunakan rute pengguna
app.use("/api", userRoute);
app.use("/api", workspaceRoute);
app.use("/api", taskRoute);
app.use("/api", notificationRoute);
app.use("/api", task_attachmentsRoute);
app.use("/api", uploadRoute);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
