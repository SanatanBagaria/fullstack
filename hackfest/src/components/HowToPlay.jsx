import React from "react";

const HowToPlay = () => {
  return (
    <div className="border rounded-lg p-6 mt-8">
      <h2 className="text-red-600 font-bold text-xl mb-4">HOW TO PLAY:</h2>
      
      <div className="space-y-4">
        <div>
          <p>
            <span className="font-bold">1. Choose a Game Mode:</span> Select from three exciting game modes: First Three, Time Attack, or Reverse Hectoc.
          </p>
        </div>
        
        <div>
          <p>
            <span className="font-bold">2. Solve Puzzles:</span> Use mathematical operations to make the given digits equal to 100.
          </p>
        </div>
        
        <div>
          <p>
            <span className="font-bold">3. Compete & Win:</span> Beat your opponents, climb the leaderboard, and earn badges!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
