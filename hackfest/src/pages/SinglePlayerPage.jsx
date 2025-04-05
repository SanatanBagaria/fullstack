import React, { useState } from "react";
import SinglePlayerMode from "../components/SinglePlayerMode";

const SinglePlayerPage = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [timeLimit, setTimeLimit] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  
  const difficulties = [
    { id: "easy", name: "Easy", timeLimit: 120 },
    { id: "medium", name: "Medium", timeLimit: 90 },
    { id: "hard", name: "Hard", timeLimit: 60 },
    { id: "custom", name: "Custom", timeLimit: null }
  ];
  
  const handleDifficultySelect = (diff) => {
    setDifficulty(diff);
    if (diff.id !== "custom") {
      setTimeLimit(diff.timeLimit);
      setGameStarted(true);
    } else {
      setTimeLimit("");
      setGameStarted(false);
    }
  };
  
  const handleCustomTimeLimit = (e) => {
    setTimeLimit(e.target.value);
  };
  
  const handleStartCustomGame = () => {
    if (timeLimit && parseInt(timeLimit) >= 10) {
      setGameStarted(true);
    }
  };
  
  const handleBack = () => {
    setDifficulty(null);
    setTimeLimit("");
    setGameStarted(false);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Single Player Mode</h1>
      
      {!difficulty ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Select Difficulty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {difficulties.map((diff) => (
              <div
                key={diff.id}
                className="border rounded-lg p-4 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition"
                onClick={() => handleDifficultySelect(diff)}
              >
                <h3 className="text-lg font-bold">{diff.name}</h3>
                {diff.id !== "custom" && (
                  <p className="text-gray-600">Time Limit: {diff.timeLimit} seconds</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : difficulty.id === "custom" && !gameStarted ? (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Set Custom Time Limit</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Time in seconds:</label>
            <input
              type="number"
              min="10"
              max="300"
              value={timeLimit}
              onChange={handleCustomTimeLimit}
              className="w-full p-2 border rounded"
              placeholder="Enter time in seconds (10-300)"
            />
          </div>
          <div className="flex justify-between">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleStartCustomGame}
              disabled={!timeLimit || parseInt(timeLimit) < 10}
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <SinglePlayerMode
          difficulty={difficulty.id}
          timeLimit={parseInt(timeLimit)}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default SinglePlayerPage;
