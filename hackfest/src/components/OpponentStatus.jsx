import React from "react";

const OpponentStatus = ({ opponent }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Opponent</h3>
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 rounded-full bg-red-300 flex items-center justify-center text-white mr-2">
          {opponent.name.charAt(0)}
        </div>
        <span className="font-medium">{opponent.name}</span>
      </div>
      <div className="text-sm text-gray-600">
        <div>Score: {opponent.score}</div>
        <div>Puzzles Solved: {opponent.puzzlesSolved || 0}</div>
      </div>
    </div>
  );
};

export default OpponentStatus;
