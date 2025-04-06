import React from "react";
import Sidebar from "./Layout/Sidebar";
import Header from "./Layout/Header";
import { currentUser } from "../data/mockData";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header user={currentUser} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
