import React from "react";

const BadgeCollection = ({ badges }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Badges</h3>
      {badges.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-3xl mb-2">🏅</div>
              <div className="text-sm font-medium">{badge}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No badges earned yet. Keep playing to earn badges!</p>
      )}
    </div>
  );
};

export default BadgeCollection;
