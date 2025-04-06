// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">HectoClash</Link>
      <div className="flex items-center">
        {user && (
          <span className="mr-4">
            Welcome, {user.name} | Score: {user.score}
          </span>
        )}
        <Link to="/" className="mr-4 hover:underline">Home</Link>
        <Link to="/singleplayer" className="mr-4 hover:underline">Practice </Link>
        <Link to="/game" className="mr-4 hover:underline">Multiplayer</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
