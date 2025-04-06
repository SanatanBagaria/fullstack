import React from "react";
import { Link } from "react-router-dom";

const GameModeSelector = () => {
  const gameModes = [
    { id: "first-three", name: "First Three", description: "Race to solve the first three puzzles" },
    { id: "time-attack", name: "Time Attack", description: "Solve as many puzzles as you can in 2 minutes" },
    { id: "reverse-hectoc", name: "Reverse Hectoc", description: "Fill in the numbers to reach 100" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {gameModes.map((mode) => (
        <Link 
          key={mode.id}
          to={`/multiplayer/${mode.id}`}
          className="bg-white border rounded-lg p-6 hover:shadow-md transition"
        >
          <h3 className="text-xl font-bold mb-2">{mode.name}</h3>
          <p className="text-gray-600">{mode.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default GameModeSelector;
