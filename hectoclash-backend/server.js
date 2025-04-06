const app = require('./src/app');
const http = require('http');
const socketIo = require('socket.io');
const socketManager = require('./socket/socketManager');
const { connectDB } = require('./src/config/database');
require('dotenv').config();

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.IO
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:5175'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Initialize socket connections
socketManager(io);

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
