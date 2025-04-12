import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config();

// Setup express app
const app = express();
const PORT = process.env.PORT || 5001;

// Create HTTP server from express
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  },
});

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/message", messageRoute);

// DB connect and server start
server.listen(PORT, () => {
  console.log(`✅ Server and socket running on port: ${PORT}`);
  connectDB();
});

// ===================== SOCKET.IO =====================


const userSocketMap = {}; // { userId: socketId }

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("🔌 New connection from:", userId);

  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  }

  socket.on('disconnect', () => {
    console.log("❌ Disconnected:", userId);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

// Export for use elsewhere (optional)
export { app, io, server };
