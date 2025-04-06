import React, { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Leaderboard from "../components/Leaderboard";
import { useAuth } from "../context/AuthContext";
import { gameAPI } from "../services/api";

const ProfilePage = () => {
  const { user, loading } = useAuth();
  const [gameHistory, setGameHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  
  useEffect(() => {
    if (user) {
      const fetchGameHistory = async () => {
        try {
          const response = await gameAPI.getHistory();
          setGameHistory(response.data.data.games);
          setHistoryLoading(false);
        } catch (err) {
          console.error("Failed to fetch game history:", err);
          setHistoryLoading(false);
        }
      };
      
      fetchGameHistory();
    }
  }, [user]);
  
  if (loading || !user) {
    return <div className="text-center p-8">Loading...</div>;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{user.name}'s Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Profile user={user} />
          
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Games</h2>
            {historyLoading ? (
              <p>Loading game history...</p>
            ) : gameHistory.length > 0 ? (
              <div className="space-y-3">
                {gameHistory.map((game) => (
                  <div key={game._id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <div>
                        <span className={game.won ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                          {game.won ? "Won" : "Lost"}
                        </span>
                        <span className="text-gray-600"> against </span>
                        <span className="font-medium">{game.opponent?.name || "Unknown"}</span>
                      </div>
                      <div className="text-gray-600">
                        {new Date(game.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Mode: {game.gameMode} | Score: {game.score}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No games played yet.</p>
            )}
          </div>
        </div>
        
        <div>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
