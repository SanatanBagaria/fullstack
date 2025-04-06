import React from "react";
import { Link } from "react-router-dom";
import HowToPlay from "../components/HowToPlay";

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-center items-center mb-8 relative">
        <div className="absolute left-0 text-4xl">×</div>
        <div className="text-center">
          <h1 className="text-7xl font-bold text-blue-900 mb-2 relative">
            HECTOCLASH
            <div className="absolute w-full h-1 bg-red-500 bottom-2"></div>
          </h1>
          <p className="text-gray-600">The Ultimate Mental Math Dueling Platform</p>
        </div>
        <div className="absolute right-0">
          <div className="w-16 h-16 border-2 border-gray-300 transform rotate-45"></div>
        </div>
      </div>

      <HowToPlay />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Link 
          to="/singleplayer" 
          className="bg-white border rounded-lg p-6 hover:shadow-md transition"
        >
          <h3 className="text-xl font-bold mb-2">Single Player</h3>
          <p className="text-gray-600">Practice your skills at your own pace.</p>
        </Link>
        
        <Link 
          to="/multiplayer/first-three" 
          className="bg-white border rounded-lg p-6 hover:shadow-md transition"
        >
          <h3 className="text-xl font-bold mb-2">Multi Player</h3>
          <p className="text-gray-600">Challenge others in real-time duels.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
