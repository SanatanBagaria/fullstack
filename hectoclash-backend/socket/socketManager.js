const { generatePuzzle } = require('../src/services/puzzleService');

// Store active games and players
const activeGames = new Map();
const waitingPlayers = new Map();

const socketManager = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Join matchmaking queue
    socket.on('joinMatchmaking', ({ userId, gameMode }) => {
      console.log(`User ${userId} joined matchmaking for ${gameMode}`);
      
      // Add to waiting players
      waitingPlayers.set(socket.id, {
        userId,
        gameMode,
        socket
      });
      
      // Check for opponent
      findOpponent(socket, userId, gameMode);
    });
    
    // Handle solution submission
    socket.on('submitSolution', ({ gameId, solution }) => {
      if (activeGames.has(gameId)) {
        const game = activeGames.get(gameId);
        // Handle solution logic
      }
    });
    
    // Handle disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      waitingPlayers.delete(socket.id);
      
      // Handle any active games this player was in
      for (const [gameId, game] of activeGames.entries()) {
        if (game.player1.socketId === socket.id || game.player2.socketId === socket.id) {
          // Notify other player about disconnect
          // End the game
        }
      }
    });
  });
};

function findOpponent(socket, userId, gameMode) {
  for (const [waitingSocketId, player] of waitingPlayers.entries()) {
    if (waitingSocketId !== socket.id && player.gameMode === gameMode) {
      // Found an opponent!
      waitingPlayers.delete(waitingSocketId);
      waitingPlayers.delete(socket.id);
      
      // Create a new game
      createGame(socket, player.socket, userId, player.userId, gameMode);
      return;
    }
  }
  
  // No opponent found, player remains in waiting queue
  socket.emit('waitingForOpponent');
}

function createGame(socket1, socket2, userId1, userId2, gameMode) {
  const gameId = Date.now().toString();
  const puzzle = generatePuzzle();
  
  const gameState = {
    gameId,
    gameMode,
    puzzle,
    player1: {
      userId: userId1,
      socketId: socket1.id,
      score: 0,
      puzzlesSolved: 0
    },
    player2: {
      userId: userId2,
      socketId: socket2.id,
      score: 0,
      puzzlesSolved: 0
    },
    startTime: Date.now()
  };
  
  activeGames.set(gameId, gameState);
  
  // Notify both players
  socket1.emit('gameStart', {
    gameId,
    opponent: userId2,
    puzzle,
    gameMode
  });
  
  socket2.emit('gameStart', {
    gameId,
    opponent: userId1,
    puzzle,
    gameMode
  });
}

module.exports = socketManager;
