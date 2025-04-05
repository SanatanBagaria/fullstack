import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const Header = ({ user }) => {
  return (
    <header className="bg-white border-b py-3 px-6 flex items-center justify-between">
      <Logo />
      <div className="flex items-center">
        <div className="mr-4">
          <span className="font-medium">Score: </span>
          <span className="font-bold">{user.score}</span>
        </div>
        <Link to="/profile" className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-white mr-2">
            {user.name.charAt(0)}
          </div>
          <span className="font-medium">{user.name}!</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
