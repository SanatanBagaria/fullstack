import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSocket } from "../services/socket";
import DuelArena from "../components/DuelArena";

const GameLobby = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    status: "waiting", // waiting, ready, playing, completed
    puzzle: "123456",  // Default puzzle for testing
    timeRemaining: 60,
    opponent: null
  });
  
  const getModeName = () => {
    switch (mode) {
      case 'first-three':
        return 'First Three';
      case 'time-attack':
        return 'Time Attack';
      case 'reverse-hectoc':
        return 'Reverse Hectoc';
      default:
        return 'Unknown Mode';
    }
  };
  
  const getModeDescription = () => {
    switch (mode) {
      case 'first-three':
        return 'First to solve three puzzles wins. Race against your opponent!';
      case 'time-attack':
        return 'Solve as many puzzles as you can in 2 minutes. Player with the most solutions wins.';
      case 'reverse-hectoc':
        return 'Fill in the missing numbers to make the equation equal 100.';
      default:
        return '';
    }
  };
  
  const handleFindOpponent = () => {
    // For testing purposes, simulate finding an opponent
    setGameState({
      ...gameState,
      status: "playing",
      opponent: { name: "Test Opponent", score: 750 }
    });
    
    // In a real implementation, you would connect to the socket here
    // const socket = getSocket();
    // socket.emit('joinGame', { gameMode: mode });
  };
  
  const handleSolutionSubmit = (solution) => {
    // For testing purposes, simulate a correct solution
    alert(`Solution submitted: ${solution}`);
    
    // In a real implementation, you would send this to the server
    // const socket = getSocket();
    // socket.emit('submitSolution', { solution });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {gameState.status === "waiting" ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold mb-2">{getModeName()}</h1>
          <p className="text-gray-600 mb-6">{getModeDescription()}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2">Game Rules</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use all six digits exactly once in your solution</li>
              <li>You can use +, -, *, /, and parentheses</li>
              <li>Your solution must equal exactly 100</li>
              <li>First player to solve the required puzzles wins</li>
            </ul>
          </div>
          
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            onClick={handleFindOpponent}
          >
            Find Opponent
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl font-bold mb-4">{getModeName()}</h1>
          <p className="mb-4">
            Playing against: <span className="font-bold">{gameState.opponent.name}</span>
          </p>
          
          <DuelArena 
            puzzle={gameState.puzzle}
            timeRemaining={gameState.timeRemaining}
            onSolutionSubmit={handleSolutionSubmit}
            opponent={gameState.opponent}
          />
          
          <button
            className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={() => navigate('/')}
          >
            Quit Game
          </button>
        </div>
      )}
    </div>
  );
};

export default GameLobby;
