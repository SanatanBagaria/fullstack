import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaUsers, FaChevronDown, FaChevronUp, FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const [multiPlayerExpanded, setMultiPlayerExpanded] = useState(false);
  const location = useLocation();

  return (
    <div className="w-48 bg-white border-r h-full">
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center py-2 ${
                location.pathname === "/" ? "text-blue-900 font-medium" : "text-gray-700"
              }`}
            >
              <FaHome className="mr-2" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/singleplayer"
              className={`flex items-center py-2 ${
                location.pathname === "/singleplayer" ? "text-blue-900 font-medium" : "text-gray-700"
              }`}
            >
              <FaUser className="mr-2" />
              Single Player
            </Link>
          </li>
          <li>
            <div
              className={`flex items-center justify-between py-2 cursor-pointer ${
                location.pathname.includes("/multiplayer") ? "text-blue-900 font-medium" : "text-gray-700"
              }`}
              onClick={() => setMultiPlayerExpanded(!multiPlayerExpanded)}
            >
              <div className="flex items-center">
                <FaUsers className="mr-2" />
                Multi Player
              </div>
              {multiPlayerExpanded ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </div>
            {multiPlayerExpanded && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link
                    to="/multiplayer/first-three"
                    className={`block py-1 ${
                      location.pathname === "/multiplayer/first-three" ? "text-blue-900" : "text-gray-600"
                    }`}
                  >
                    ▶ First Three
                  </Link>
                </li>
                <li>
                  <Link
                    to="/multiplayer/time-attack"
                    className={`block py-1 ${
                      location.pathname === "/multiplayer/time-attack" ? "text-blue-900" : "text-gray-600"
                    }`}
                  >
                    ▶ Time Attack
                  </Link>
                </li>
                <li>
                  <Link
                    to="/multiplayer/reverse-hectoc"
                    className={`block py-1 ${
                      location.pathname === "/multiplayer/reverse-hectoc" ? "text-blue-900" : "text-gray-600"
                    }`}
                  >
                    ▶ Reverse Hectoc
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center py-2 ${
                location.pathname === "/profile" ? "text-blue-900 font-medium" : "text-gray-700"
              }`}
            >
              <FaUserCircle className="mr-2" />
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
