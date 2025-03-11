import { Server } from "socket.io";

let io;

// Inisialisasi Socket.IO
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Ubah sesuai kebutuhan
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Bergabung ke room user tertentu
    socket.on("joinRoom", (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} joined room.`);
    });

    // Event notifikasi
    socket.on("sendNotification", (data) => {
      const { userId, message } = data;
      io.to(`user_${userId}`).emit("newNotification", { message });
      console.log(`Sent to user_${userId}: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

// Helper untuk mengambil instance io
export const getIO = () => {
  if (!io) throw new Error("Socket.IO belum diinisialisasi!");
  return io;
};
