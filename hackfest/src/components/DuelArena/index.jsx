import React, { useState } from "react";
import Timer from "./Timer";
import PuzzleDisplay from "./PuzzleDisplay";
import SolutionInput from "./SolutionInput";

const DuelArena = ({ puzzle, timeRemaining, onSolutionSubmit, opponent }) => {
  const [solution, setSolution] = useState("");
  
  const handleSolutionChange = (e) => {
    setSolution(e.target.value);
  };
  
  const handleSubmit = () => {
    if (solution.trim() === "") return;
    
    onSolutionSubmit(solution);
    setSolution("");
  };
  
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="grid grid-cols-1 gap-6">
        <Timer seconds={timeRemaining} />
        <PuzzleDisplay puzzle={puzzle} />
        
        <SolutionInput 
          value={solution} 
          onChange={handleSolutionChange} 
          onSubmit={handleSubmit}
        />
        
        {opponent && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Opponent</h3>
            <div>{opponent.name}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DuelArena;
