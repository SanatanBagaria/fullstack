import React from "react";

const PuzzleDisplay = ({ puzzle, mode }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold mb-2">Current Puzzle</h3>
      {mode === "reverse-hectoc" ? (
        <div className="text-2xl font-mono text-center">
          <span className="border px-2 py-1 mx-1">?</span> + 
          <span className="border px-2 py-1 mx-1">?</span> × 
          <span className="border px-2 py-1 mx-1">?</span> = 100
        </div>
      ) : (
        <div className="text-2xl font-mono tracking-wider text-center">
          {puzzle.split('').join(' ')}
        </div>
      )}
    </div>
  );
};

export default PuzzleDisplay;
