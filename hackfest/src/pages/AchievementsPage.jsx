// pages/AchievementsPage.jsx
import React from "react";
import { currentUser } from "../data/mockData";

const AchievementsPage = () => {
  const achievements = [
    { id: 1, name: "Speed Demon", description: "Solve 5 puzzles in under 60 seconds", completed: true, date: "2023-03-15" },
    { id: 2, name: "Perfect Solver", description: "Complete 10 puzzles without any mistakes", completed: true, date: "2023-03-20" },
    { id: 3, name: "Math Wizard", description: "Reach a score of 1000 points", completed: false, progress: "800/1000" },
    { id: 4, name: "Winning Streak", description: "Win 5 multiplayer games in a row", completed: true, date: "2023-04-01" },
    { id: 5, name: "Puzzle Master", description: "Solve 100 puzzles", completed: false, progress: "78/100" },
    { id: 6, name: "Time Lord", description: "Complete a hard puzzle in under 15 seconds", completed: false, progress: "Best: 18s" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Achievements</h1>
        <div className="ml-4 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
          {achievements.filter(a => a.completed).length}/{achievements.length} Completed
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`border rounded-lg p-4 ${achievement.completed ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{achievement.name}</h3>
              {achievement.completed ? (
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Completed</div>
              ) : (
                <div className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">In Progress</div>
              )}
            </div>
            <p className="text-gray-600 mt-2">{achievement.description}</p>
            <div className="mt-4 text-sm">
              {achievement.completed ? (
                <span className="text-green-600">Completed on {achievement.date}</span>
              ) : (
                <div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${parseInt(achievement.progress.split('/')[0]) / parseInt(achievement.progress.split('/')[1]) * 100}%` }}></div>
                  </div>
                  <span className="text-gray-600 mt-1 inline-block">{achievement.progress}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
