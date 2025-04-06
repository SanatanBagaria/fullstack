import React from "react";

const UserStats = ({ user }) => {
  const winRate = user.wins + user.losses > 0 
    ? Math.round((user.wins / (user.wins + user.losses)) * 100) 
    : 0;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-4">Stats</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-gray-600 text-sm">Score</div>
          <div className="text-2xl font-bold">{user.score}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-gray-600 text-sm">Wins</div>
          <div className="text-2xl font-bold">{user.wins}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-gray-600 text-sm">Losses</div>
          <div className="text-2xl font-bold">{user.losses}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg text-center">
          <div className="text-gray-600 text-sm">Win Rate</div>
          <div className="text-2xl font-bold">{winRate}%</div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
