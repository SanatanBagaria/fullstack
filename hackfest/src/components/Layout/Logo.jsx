import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="border border-gray-300 p-1 mr-2">
        <div className="grid grid-cols-2 grid-rows-2 gap-0.5">
          <div className="w-2 h-2 bg-blue-900"></div>
          <div className="w-2 h-2 bg-blue-900"></div>
          <div className="w-2 h-2 bg-blue-900"></div>
          <div className="w-2 h-2 bg-blue-900"></div>
        </div>
      </div>
      <span className="text-blue-900 font-bold text-xl">HECTOCLASH</span>
    </Link>
  );
};

export default Logo;
