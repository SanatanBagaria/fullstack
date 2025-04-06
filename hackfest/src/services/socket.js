import { io } from 'socket.io-client';

let socket;

export const initSocket = (token) => {
  try {
    const socketURL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    console.log('Connecting to socket server at:', socketURL);
    
    socket = io(socketURL, {
      auth: {
        token
      }
    });
    
    socket.on('connect', () => {
      console.log('Connected to socket server with ID:', socket.id);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });
    
    socket.on('disconnect', (reason) => {
      console.log('Disconnected from socket server:', reason);
    });
    
    return socket;
  } catch (error) {
    console.error('Failed to initialize socket:', error);
    return null;
  }
};

export const getSocket = () => {
  if (!socket || !socket.connected) {
    const token = localStorage.getItem('token');
    return initSocket(token);
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    console.log('Closing socket connection');
    socket.disconnect();
  }
};
