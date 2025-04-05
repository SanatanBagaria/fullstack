import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSocket } from '../services/socket';
import { useAuth } from '../context/AuthContext';
import DuelArena from './DuelArena';

const MultiPlayerGame = () => {
  const { mode } = useParams();
  const { user } = useAuth();
  const [gameState, setGameState] = useState({
    status: 'waiting',
    puzzle: null,
    opponent: null
  });
  
  useEffect(() => {
    const socket = getSocket();
    
    // Join game room
    socket.emit('joinGame', {
      gameId: mode,
      userId: user._id,
      username: user.name
    });
    
    // Listen for game events
    socket.on('gameReady', (data) => {
      setGameState(prev => ({
        ...prev,
        status: 'ready',
        opponent: data.players.find(p => p.id !== user._id)
      }));
    });
    
    socket.on('gameStart', (data) => {
      setGameState(prev => ({
        ...prev,
        status: 'playing',
        puzzle: data.puzzle
      }));
    });
    
    socket.on('gameResult', (data) => {
      setGameState(prev => ({
        ...prev,
        status: 'completed',
        winner: data.winnerId
      }));
    });
    
    return () => {
      socket.off('gameReady');
      socket.off('gameStart');
      socket.off('gameResult');
    };
  }, [mode, user]);
  
  const handleSolutionSubmit = (solution) => {
    const socket = getSocket();
    socket.emit('submitSolution', {
      gameId: mode,
      userId: user._id,
      solution
    });
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        {mode === 'first-three' ? 'First Three' : 
         mode === 'time-attack' ? 'Time Attack' : 'Reverse Hectoc'}
      </h1>
      
      {gameState.status === 'waiting' && (
        <div>Waiting for opponent...</div>
      )}
      
      {gameState.status === 'ready' && (
        <div>
          <p>Opponent found: {gameState.opponent.username}</p>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => getSocket().emit('playerReady', { gameId: mode, userId: user._id })}
          >
            Ready
          </button>
        </div>
      )}
      
      {gameState.status === 'playing' && (
        <DuelArena 
          puzzle={gameState.puzzle}
          onSolutionSubmit={handleSolutionSubmit}
          opponent={gameState.opponent}
          gameMode={mode}
        />
      )}
      
      {gameState.status === 'completed' && (
        <div>
          <h2 className="text-xl font-bold">
            {gameState.winner === user._id ? 'You won!' : 'You lost!'}
          </h2>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            onClick={() => window.location.reload()}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MultiPlayerGame;
