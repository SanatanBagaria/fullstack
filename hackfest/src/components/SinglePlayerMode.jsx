import React, { useState, useEffect } from 'react';
import { gameAPI } from '../services/api';

const SinglePlayerMode = () => {
  const [puzzle, setPuzzle] = useState('');
  const [solution, setSolution] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPuzzle();
  }, []);

  const fetchPuzzle = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching puzzle...');
      const response = await gameAPI.getPuzzle();
      console.log('Puzzle response:', response.data);
      setPuzzle(response.data.data.puzzle);
      setMessage('');
    } catch (error) {
      console.error('Error fetching puzzle:', error);
      setError('Failed to fetch puzzle. Please try again.');
      // Use a fallback puzzle if API fails
      setPuzzle('123456');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!solution.trim()) return;
    
    try {
      setMessage('Validating solution...');
      const response = await gameAPI.validateSolution({ puzzle, solution });
      
      if (response.data.data.isValid) {
        setMessage('Correct! Fetching new puzzle...');
        fetchPuzzle();
        setSolution('');
      } else {
        setMessage('Incorrect. Try again!');
      }
    } catch (error) {
      console.error('Error validating solution:', error);
      setMessage('Failed to validate solution. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Single Player Mode</h2>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        {loading ? (
          <div className="text-center py-8">Loading puzzle...</div>
        ) : error ? (
          <div className="text-red-500 py-4">{error}</div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Current Puzzle</h3>
              <div className="text-2xl font-mono tracking-wider text-center p-4 bg-gray-50 rounded">
                {puzzle.split('').join(' ')}
              </div>
              <p className="text-sm text-gray-600 mt-2 text-center">
                Use these digits to create an expression that equals 100
              </p>
            </div>
            
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                value={solution} 
                onChange={(e) => setSolution(e.target.value)} 
                placeholder="Enter your solution (e.g., 1+2*3+4+5*6)" 
                className="w-full p-3 border rounded mb-3"
              />
              <button 
                type="submit"
                className="w-full py-2 bg-blue-900 hover:bg-blue-800 text-white rounded"
              >
                Submit Solution
              </button>
            </form>
            
            {message && (
              <div className={`mt-4 p-3 rounded ${
                message.includes('Correct') ? 'bg-green-100 text-green-800' : 
                message.includes('Incorrect') ? 'bg-yellow-100 text-yellow-800' : 
                'bg-blue-100 text-blue-800'
              }`}>
                {message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SinglePlayerMode;
