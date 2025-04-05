import React, { useState, useEffect } from 'react';
import { gameAPI } from '../services/api';

const GameHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGameHistory();
  }, []);

  const fetchGameHistory = async () => {
    try {
      const response = await gameAPI.getHistory();
      setHistory(response.data.data.games);
    } catch (error) {
      console.error('Error fetching game history:', error);
      setError('Failed to fetch game history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading game history...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Game History</h2>
      <ul>
        {history.map((game) => (
          <li key={game._id}>
            {game.gameMode} - Score: {game.score} - 
            {game.won ? 'Won' : 'Lost'} - 
            {new Date(game.createdAt).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
